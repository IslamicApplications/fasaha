import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Load pure TypeScript utilities without adding a test runtime dependency.
async function loadUtility(name) {
  const source = await readFile(new URL(`../src/utils/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

const { calculateArabicMatchScore } = await loadUtility('audio');
const { calculateNextSRS, isDueForReview } = await loadUtility('srs');
const { recordActivity } = await loadUtility('streak');
const { createSpeechRewardGate } = await loadUtility('rewards');

test('empty answers and single-letter substrings do not pass', () => {
  assert.equal(calculateArabicMatchScore('صَبَاحُ الخَيْرِ', ''), 0);
  assert.equal(calculateArabicMatchScore('صَبَاحُ الخَيْرِ', '   '), 0);
  assert.equal(calculateArabicMatchScore('صَبَاحُ الخَيْرِ', 'َ'), 0);
  assert.ok(calculateArabicMatchScore('صَبَاحُ الخَيْرِ', 'ص') < 60);
  assert.ok(calculateArabicMatchScore('صَبَاحُ الخَيْرِ', 'صباح') < 80);
});

test('full answers ignore harakat and allow small spelling mistakes', () => {
  assert.equal(calculateArabicMatchScore('صَبَاحُ الخَيْرِ', 'صباح الخير'), 100);
  assert.ok(calculateArabicMatchScore('صباح الخير', 'صباح الخیر') >= 80);
  assert.equal(calculateArabicMatchScore('صباح الخير', 'zzzzzzzzzzz'), 0);
});

test('speech rewards require one successful final result per attempt', () => {
  const reward = createSpeechRewardGate();
  assert.equal(reward(90, false), false);
  assert.equal(reward(100, false), false);
  assert.equal(reward(40, true), false);
  assert.equal(reward(90, true), true);
  assert.equal(reward(100, true), false);
  assert.equal(createSpeechRewardGate()(90, true), true);
});

const item = { id: 'word', interval: 1, repetition: 0, easinessFactor: 2.5, nextReviewDate: '' };
test('graded cards leave the due queue and return at their scheduled time', () => {
  assert.equal(isDueForReview(item), true);
  for (const grade of [1, 3, 4, 5]) {
    const reviewed = calculateNextSRS(item, grade);
    assert.equal(isDueForReview(reviewed), false);
    const due = Date.parse(reviewed.nextReviewDate);
    assert.equal(isDueForReview(reviewed, due - 1), false);
    assert.equal(isDueForReview(reviewed, due), true);
  }
});

test('invalid saved review dates do not permanently hide cards', () => {
  assert.equal(isDueForReview({ ...item, nextReviewDate: 'invalid' }), true);
});

function activity(streak, previous, current) {
  return recordActivity({ streak, lastActiveDate: new Date(previous).toISOString(), xp: 100 }, new Date(current));
}

test('repeated activity on the same local date keeps the streak', () => {
  assert.equal(activity(3, '2026-10-04T01:00:00', '2026-10-04T23:00:00').streak, 3);
});

test('consecutive local dates increment the streak across midnight and DST', () => {
  assert.equal(activity(3, '2026-10-03T23:55:00', '2026-10-04T00:05:00').streak, 4);
  assert.equal(activity(3, '2026-10-03T12:00:00', '2026-10-04T12:00:00').streak, 4);
});

test('missed days reset the streak and activity updates the timestamp', () => {
  const result = activity(7, '2026-10-01T12:00:00', '2026-10-04T12:00:00');
  assert.equal(result.streak, 1);
  assert.equal(result.lastActiveDate, new Date('2026-10-04T12:00:00').toISOString());
  assert.equal(result.xp, 100);
});

test('new or invalid stored streaks start at one', () => {
  assert.equal(activity(0, '2026-10-04T01:00:00', '2026-10-04T12:00:00').streak, 1);
  assert.equal(recordActivity({ streak: 5, lastActiveDate: 'invalid' }).streak, 1);
});
