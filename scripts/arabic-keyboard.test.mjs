import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/utils/arabicKeyboard.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { ARABIC_KEY_ROWS, mapPhysicalKey, editAtSelection } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const key = (code, value, extra = {}) => mapPhysicalKey({ code, key: value, ...extra });

test('physical keys form an Arabic word using the Arabic 101 positions', () => {
  assert.equal([['KeyH', 'h'], ['KeyG', 'g'], ['KeyF', 'f'], ['KeyD', 'd'], ['KeyJ', 'j']].map(([code, value]) => key(code, value)).join(''), 'البيت');
  assert.equal(key('KeyB', 'b'), 'لا');
  assert.equal(key('Backquote', '`'), 'ذ');
  assert.equal(key('KeyH', 'H'), 'ا'); // Caps Lock does not insert a vowel.
});

test('shifted keys produce vowel marks, alternate alefs, and punctuation', () => {
  for (const [code, value, expected] of [
    ['KeyQ', 'Q', 'َ'], ['KeyE', 'E', 'ُ'], ['KeyA', 'A', 'ِ'], ['KeyX', 'X', 'ْ'],
    ['Backquote', '~', 'ّ'], ['KeyW', 'W', 'ً'], ['KeyR', 'R', 'ٌ'], ['KeyS', 'S', 'ٍ'],
    ['KeyH', 'H', 'أ'], ['KeyY', 'Y', 'إ'], ['KeyB', 'B', 'لآ'], ['KeyK', 'K', '،'], ['Slash', '?', '؟'],
  ]) assert.equal(key(code, value, { shiftKey: true }), expected);
});

test('native Arabic, IME, shortcuts, numbers, and navigation keys pass through', () => {
  assert.equal(key('KeyQ', 'ض'), null);
  assert.equal(key('KeyQ', 'q', { isComposing: true }), null);
  for (const modifier of ['ctrlKey', 'metaKey', 'altKey']) assert.equal(key('KeyA', 'a', { [modifier]: true }), null);
  for (const [code, value] of [['Digit1', '1'], ['ArrowLeft', 'ArrowLeft'], ['KeyQ', 'Dead'], ['KeyQ', 'Process'], ['Tab', 'Tab'], ['Backspace', 'Backspace']]) assert.equal(key(code, value), null);
  assert.equal(key('Space', ' '), ' ');
});

test('key definitions have unique physical positions', () => {
  const keys = ARABIC_KEY_ROWS.flat();
  assert.equal(new Set(keys.map(k => k.code)).size, keys.length);
});

test('insertion respects the cursor and places it after multi-character keys', () => {
  assert.deepEqual(editAtSelection('كت', 1, 1, 'لا'), { value: 'كلات', caret: 3 });
  assert.deepEqual(editAtSelection('باب', 1, 2, 'و'), { value: 'بوب', caret: 2 });
});

test('backspace deletes selections and individual vowel marks', () => {
  assert.deepEqual(editAtSelection('بَ', 2, 2, null), { value: 'ب', caret: 1 });
  assert.deepEqual(editAtSelection('كتاب', 1, 3, null), { value: 'كب', caret: 1 });
  assert.deepEqual(editAtSelection('ب', 0, 0, null), { value: 'ب', caret: 0 });
  assert.deepEqual(editAtSelection('ب😀', 3, 3, null), { value: 'ب', caret: 1 });
});
