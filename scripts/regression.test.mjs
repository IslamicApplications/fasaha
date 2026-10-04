import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Load pure TypeScript utilities without adding a test runtime dependency.
async function utilityUrl(name) {
  const source = await readFile(new URL(`../src/utils/${name}.ts`, import.meta.url), 'utf8');
  let { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  for (const match of [...outputText.matchAll(/from ['"]\.\/([^'"]+)['"]/g)]) {
    outputText = outputText.replace(match[0], `from '${await utilityUrl(match[1])}'`);
  }
  return `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
}
async function loadUtility(name) { return import(await utilityUrl(name)); }

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

const { buildDailyLesson, claimDailyReward, dailyReward, validSession, localDate } = await loadUtility('dailyLesson');
const stats = { xp: 100, streak: 1, lastActiveDate: new Date().toISOString(), masteredVocab: ['mastered'], completedReading: [], completedGrammar: [], completedDialogues: [] };
const words = [
  { id: 'overdue', arabic: 'كتاب', english: 'Book' },
  { id: 'future', arabic: 'قلم', english: 'Pen' },
  { id: 'fresh', arabic: 'باب', english: 'Door' },
  { id: 'mastered', arabic: 'بيت', english: 'House' },
];
const lessons = [
  { id: 'g1', titleEn: 'Gender', quiz: [{ id: 1, question: 'Gender?', options: ['A', 'B'], correctIndex: 1 }] },
  { id: 'g2', titleEn: 'Pronouns', quiz: [{ id: 1, question: 'Pronoun?', options: ['A', 'B'], correctIndex: 0 }] },
];
const passages = [{ id: 'p1', sentences: [{ id: 1, arabic: 'هذا كتاب', english: 'This is a book' }] }];
const dialogues = [{ id: 'd1', titleEn: 'Hello', dialogue: [{ id: 1, arabic: 'مرحبا', english: 'Hello' }] }];
const now = new Date('2026-10-04T12:00:00');
const schedule = {
  overdue: { ...item, id: 'overdue', nextReviewDate: '2026-10-01T00:00:00Z' },
  future: { ...item, id: 'future', nextReviewDate: '2026-10-08T00:00:00Z' },
};
function lesson(mistakes = {}) { return buildDailyLesson(words, lessons, passages, dialogues, stats, schedule, mistakes, now); }

test('daily lesson prioritizes overdue words and excludes future reviews and mastered new words', () => {
  const session = lesson();
  const vocabulary = session.steps.filter(s => s.kind === 'vocabulary');
  assert.deepEqual(vocabulary.map(s => s.wordId), ['overdue', 'fresh']);
  for (const step of vocabulary) assert.equal(step.options[step.correctIndex], step.english);
  assert.deepEqual(session.steps.map(s => s.kind), ['vocabulary', 'vocabulary', 'dictation', 'grammar', 'conversation']);
});

test('grammar mistakes determine the next personalized question', () => {
  assert.equal(lesson({ 'g2:1': 2 }).steps.find(s => s.kind === 'grammar').grammarKey, 'g2:1');
});

test('daily plan is stable for the same day and handles an empty review queue', () => {
  assert.deepEqual(lesson(), lesson());
  const session = buildDailyLesson([], lessons, passages, dialogues, stats, {}, {}, now);
  assert.deepEqual(session.steps.map(s => s.kind), ['dictation', 'grammar', 'conversation']);
});

test('only today’s well-formed sessions can resume', () => {
  const session = lesson();
  assert.equal(validSession(session, localDate(now)), true);
  assert.equal(validSession({ ...session, index: 1 }, session.date), false);
  assert.equal(validSession({ ...session, date: '2026-10-03' }, session.date), false);
  assert.equal(validSession(null, session.date), false);
  const resumed = { ...session, index: 1, results: [{ score: 100, correct: true }] };
  assert.equal(validSession(JSON.parse(JSON.stringify(resumed)), session.date), true);
});

test('completion rewards depend on accuracy and cannot be claimed twice', () => {
  const results = [{ score: 100, correct: true }, { score: 30, correct: false }];
  assert.equal(dailyReward(results), 20);
  const rewarded = claimDailyReward(stats, '2026-10-04', dailyReward(results));
  assert.equal(rewarded.xp, 120);
  assert.strictEqual(claimDailyReward(rewarded, '2026-10-04', 20), rewarded);
  assert.equal(claimDailyReward(rewarded, '2026-10-05', 20).xp, 140);
});

test('missing optional lesson content does not create unusable steps', () => {
  assert.equal(buildDailyLesson([], [], [], [], stats, {}, {}, now).steps.length, 0);
});
