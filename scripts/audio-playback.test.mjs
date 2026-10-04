import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

function asModule(source) {
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return outputText;
}
const textModule = `data:text/javascript;base64,${Buffer.from(asModule(await readFile(new URL('../src/utils/audioText.ts', import.meta.url), 'utf8'))).toString('base64')}`;
const audioSource = asModule(await readFile(new URL('../src/utils/audio.ts', import.meta.url), 'utf8')).replace("'./audioText'", `'${textModule}'`);
const { ArabicAudioService } = await import(`data:text/javascript;base64,${Buffer.from(audioSource).toString('base64')}`);

function setup(t) {
  const originals = { window: globalThis.window, Audio: globalThis.Audio, SpeechSynthesisUtterance: globalThis.SpeechSynthesisUtterance };
  t.after(() => { for (const [key, value] of Object.entries(originals)) { if (value === undefined) delete globalThis[key]; else globalThis[key] = value; } });
  const spoken = [];
  const clips = [];
  globalThis.window = { location: { href: 'https://example.com/fasaha/' }, speechSynthesis: {
    getVoices: () => [], cancel() {}, speak: utterance => spoken.push(utterance),
  } };
  globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  globalThis.Audio = class {
    constructor(url) { this.url = url; clips.push(this); }
    play() { return Promise.resolve(); }
    pause() { this.paused = true; }
  };
  const service = new ArabicAudioService();
  service.setRecordings({ 'صباح الخير': 'audio/morning.mp3', 'بَ': 'audio/ba.mp3' }, './');
  return { service, clips, spoken };
}

test('stored recordings play from the deployment base and preserve speed controls', t => {
  const { service, clips, spoken } = setup(t);
  let ended = 0;
  service.speak(' صباح  الخير ', { rate: 0.65, onEnd: () => ended++ });
  assert.equal(clips[0].url, 'https://example.com/fasaha/audio/morning.mp3');
  assert.equal(clips[0].playbackRate, 0.65);
  assert.equal(clips[0].preservesPitch, true);
  assert.equal(spoken.length, 0);
  clips[0].onended();
  assert.equal(ended, 1);
});

test('custom text and different vowel marks use browser speech', t => {
  const { service, clips, spoken } = setup(t);
  service.speak('بُ');
  assert.equal(clips.length, 0);
  assert.equal(spoken[0].text, 'بُ');
});

test('a missing MP3 falls back once even when error and rejection both occur', async t => {
  const { service, clips, spoken } = setup(t);
  globalThis.Audio.prototype.play = function () { return Promise.reject(new Error('Missing file')); };
  let ended = 0;
  service.speak('صباح الخير', { onEnd: () => ended++ });
  clips[0].onerror();
  await Promise.resolve();
  assert.equal(spoken.length, 1);
  spoken[0].onend();
  spoken[0].onerror();
  assert.equal(ended, 1);
});

test('stopping playback cancels the clip and ignores stale callbacks', t => {
  const { service, clips, spoken } = setup(t);
  let ended = 0;
  let cancelled = 0;
  service.speak('صباح الخير', { onEnd: () => ended++, onCancel: () => cancelled++ });
  const oldEnd = clips[0].onended;
  const oldError = clips[0].onerror;
  service.stop();
  oldEnd(); oldError();
  assert.equal(clips[0].paused, true);
  assert.equal(ended, 0);
  assert.equal(cancelled, 1);
  assert.equal(spoken.length, 0);
});

test('starting another phrase pauses the previous clip', t => {
  const { service, clips } = setup(t);
  service.speak('صباح الخير');
  service.speak('بَ');
  assert.equal(clips[0].paused, true);
  assert.equal(clips[1].url, 'https://example.com/fasaha/audio/ba.mp3');
});
