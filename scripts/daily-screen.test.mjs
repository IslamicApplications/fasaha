import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const modules = new Map();
async function moduleUrl(path) {
  if (modules.has(path)) return modules.get(path);
  const source = await readFile(path, 'utf8');
  let { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React },
  });
  for (const match of [...outputText.matchAll(/^(import[^\n]*from )['"]([^'"]+)['"]/gm)]) {
    const name = match[2];
    let url;
    if (name.startsWith('.')) {
      const base = resolve(dirname(path), name);
      let found;
      for (const suffix of ['.ts', '.tsx', '/index.ts']) {
        try { await access(base + suffix); found = base + suffix; break; } catch {}
      }
      if (!found) throw new Error(`Cannot resolve ${name} in ${path}`);
      url = await moduleUrl(found);
    } else { url = import.meta.resolve(name); }
    outputText = outputText.replace(match[0], `${match[1]}'${url}'`);
  }
  const url = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  modules.set(path, url);
  return url;
}
const { DailyLesson } = await import(await moduleUrl(fileURLToPath(new URL('../src/components/DailyLesson.tsx', import.meta.url))));
const { localDate } = await import(await moduleUrl(fileURLToPath(new URL('../src/utils/dailyLesson.ts', import.meta.url))));
const stats = { xp: 100, streak: 1, lastActiveDate: new Date().toISOString(), masteredVocab: [], completedReading: [], completedGrammar: [], completedDialogues: [] };
const stored = new Map();
globalThis.localStorage = { getItem: key => stored.get(key) || null, setItem: (key, value) => stored.set(key, value) };
function render() { return renderToStaticMarkup(React.createElement(DailyLesson, { stats, onComplete() {} })); }

test('new daily screen renders all planned exercises and a disabled answer check', () => {
  stored.clear();
  const html = render();
  assert.match(html, /Today’s Lesson/);
  assert.match(html, /Exercise 1 of 6/);
  assert.match(html, /Choose the meaning/);
  assert.match(html, /disabled=""[^>]*>Check answer/);
});

test('a saved dictation checkpoint hides the target until it is checked', () => {
  stored.clear();
  const session = { date: localDate(), index: 0, results: [], steps: [{ id: 'dictation:p1', kind: 'dictation', title: 'Listen and write', prompt: 'Listen first', arabic: 'هدف سري', english: 'Hidden target' }] };
  stored.set('fasaha_daily_lesson', JSON.stringify(session));
  const html = render();
  assert.match(html, /Listen to the sentence/);
  assert.match(html, /Your answer/);
  assert.doesNotMatch(html, /هدف سري|Hidden target/);
  session.results = [{ score: 50, correct: false }];
  stored.set('fasaha_daily_lesson', JSON.stringify(session));
  const checked = render();
  assert.match(checked, /هدف سري/);
  assert.match(checked, /Keep practicing/);
  assert.match(checked, /Finish lesson/);
});

test('completed sessions reopen as a summary with a practical next goal', () => {
  stored.clear();
  stored.set('fasaha_daily_lesson', JSON.stringify({ date: localDate(), index: 1, results: [{ score: 100, correct: true }], steps: [{ id: 'conversation:d1', kind: 'conversation', title: 'Introductions', prompt: 'Practice', arabic: 'مرحبا', english: 'Hello' }] }));
  const html = render();
  assert.match(html, /completed today’s lesson/);
  assert.match(html, /20 XP/);
  assert.match(html, /Your goal for tomorrow/);
  assert.doesNotMatch(html, /Check answer/);
});

test('an old checkpoint starts a fresh lesson for today', () => {
  stored.clear();
  stored.set('fasaha_daily_lesson', JSON.stringify({ date: '2000-01-01', index: 1, results: [{ score: 100, correct: true }], steps: [{ id: 'conversation:d1', kind: 'conversation', title: 'Introductions', prompt: 'Practice', arabic: 'مرحبا', english: 'Hello' }] }));
  assert.match(render(), /Exercise 1 of 6/);
});
