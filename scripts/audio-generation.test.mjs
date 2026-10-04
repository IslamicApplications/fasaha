import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateAudio, audioFile, collectLessonTexts, DEFAULT_VOICE } from './generate-audio.mjs';

test('recording names preserve vowels and change when the voice changes', () => {
  assert.notEqual(audioFile('بَ', DEFAULT_VOICE), audioFile('بُ', DEFAULT_VOICE));
  assert.equal(audioFile(' صباح  الخير ', DEFAULT_VOICE), audioFile('صباح الخير', DEFAULT_VOICE));
  assert.notEqual(audioFile('صباح الخير', DEFAULT_VOICE), audioFile('صباح الخير', 'ar-XA-Chirp3-HD-Kore'));
});

test('catalogue includes lesson phrases but makes phonetics opt-in', async () => {
  const normal = await collectLessonTexts();
  const phonetics = await collectLessonTexts(true);
  assert.ok(normal.includes('صَبَاحُ الخَيْرِ'));
  assert.ok(!normal.includes('بَ'));
  assert.ok(phonetics.includes('بَ'));
  assert.equal(normal.length, new Set(normal).size);
  assert.ok(normal.every(text => !/\p{Script=Latin}/u.test(text)));
});

test('Google synthesis saves clips, reuses existing audio, and keeps credentials out of the manifest', async t => {
  const root = await mkdtemp(join(tmpdir(), 'fasaha-audio-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  let calls = 0;
  const fetchImpl = async (url, options) => {
    calls++;
    assert.equal(url, 'https://texttospeech.googleapis.com/v1/text:synthesize');
    assert.equal(options.headers.Authorization, 'Bearer test-secret');
    assert.equal(options.headers['x-goog-user-project'], 'test-project');
    const body = JSON.parse(options.body);
    assert.equal(body.voice.languageCode, 'ar-XA');
    assert.equal(body.audioConfig.audioEncoding, 'MP3');
    return { ok: true, json: async () => ({ audioContent: Buffer.from('ID3mock-audio').toString('base64') }) };
  };
  const options = { root, texts: ['مرحبا', 'مرحبا'], token: 'test-secret', projectId: 'test-project', fetchImpl };
  assert.deepEqual(await generateAudio(options), { generated: 1, reused: 0 });
  assert.deepEqual(await generateAudio(options), { generated: 0, reused: 1 });
  assert.equal(calls, 1);
  const manifest = await readFile(join(root, 'src/data/audioManifest.ts'), 'utf8');
  assert.match(manifest, /مرحبا/);
  assert.doesNotMatch(manifest, /test-secret|test-project/);
  assert.ok((await stat(join(root, 'public', audioFile('مرحبا', DEFAULT_VOICE)))).size > 0);
});

test('failed requests never publish an audio entry', async t => {
  const root = await mkdtemp(join(tmpdir(), 'fasaha-audio-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await assert.rejects(generateAudio({ root, texts: ['مرحبا'], token: 'secret', projectId: 'project',
    fetchImpl: async () => ({ ok: false, status: 401 }) }), /HTTP 401/);
  await assert.rejects(readFile(join(root, 'src/data/audioManifest.ts')), { code: 'ENOENT' });
});
