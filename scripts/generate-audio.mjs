import { readFile, writeFile, mkdir, rename, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
export const DEFAULT_VOICE = 'ar-XA-Chirp3-HD-Charon';
const normalize = text => text.normalize('NFC').replace(/\s+/g, ' ').trim();

async function loadData(file, root = projectRoot) {
  const source = await readFile(resolve(root, file), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
export async function collectLessonTexts(includePhonetics = false) {
  const texts = new Set();
  const add = text => {
    if (typeof text !== 'string') return;
    const normalized = normalize(text);
    if (normalized && /\p{Script=Arabic}/u.test(normalized) && !/\p{Script=Latin}/u.test(normalized)) texts.add(normalized);
  };
  const walk = value => {
    if (!value || typeof value !== 'object') return;
    for (const [key, entry] of Object.entries(value)) {
      if (key === 'arabic' || key === 'audioText') add(entry);
      else if (typeof entry === 'object') walk(entry);
    }
  };
  // Start with five dictation phrases and a dialogue line for a small comparison batch.
  for (const file of ['dictationData', 'conversationData', 'vocabData', 'readingData', 'morphologyData']) {
    walk(await loadData(`src/data/${file}.ts`));
  }
  const grammar = await loadData('src/data/grammarData.ts');
  walk(grammar.GRAMMAR_LESSONS);
  for (const verb of grammar.VERB_CONJUGATION_BANK) {
    for (const tense of [verb.past, verb.present, verb.imperative]) Object.values(tense).forEach(add);
  }
  const culture = await loadData('src/data/culturalData.ts');
  walk(culture.PROVERBS_DATA);
  culture.CALLIGRAPHY_STYLES.forEach(style => add(style.sampleText));
  culture.DIALECT_COMPARISONS.forEach(dialect => add(dialect.msa.arabic));
  const alphabet = await loadData('src/data/alphabetData.ts');
  alphabet.ALPHABET_DATA.forEach(letter => {
    add(letter.exampleWord.arabic);
    if (includePhonetics) {
      add(letter.letter);
      add(letter.nameAr);
      Object.entries(letter.vowels).filter(([key]) => !key.endsWith('Translit')).forEach(([, value]) => add(value));
    }
  });
  if (includePhonetics) {
    const harakat = await loadData('src/data/harakatData.ts');
    harakat.HARAKAT_DATA.forEach(mark => add(mark.withSample));
  }
  add('أَنَا أَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ بِطَلَاقَةٍ.');
  add('مَرْحَبًا بِكُمْ فِي فَصَاحَة');
  ['كِتَابٌ', 'مَدْرَسَةٌ', 'حَدِيقَةٌ', 'صَبَاحٌ'].forEach(add);
  return [...texts];
}
export function audioFile(text, voice) {
  const hash = createHash('sha256').update(`${voice}\n${normalize(text)}`).digest('hex').slice(0, 24);
  return `audio/google-${hash}.mp3`;
}
export async function generateAudio({ texts, voice = DEFAULT_VOICE, token, projectId, root = projectRoot, fetchImpl = fetch }) {
  if (!token || !projectId) throw new Error('Configure GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_ACCESS_TOKEN, or sign in with the gcloud CLI.');
  if (!/^ar-XA-Chirp3-HD-[A-Za-z]+$/.test(voice)) throw new Error('Choose an ar-XA-Chirp3-HD voice.');
  await mkdir(resolve(root, 'public/audio'), { recursive: true });
  await mkdir(resolve(root, 'src/data'), { recursive: true });
  let manifest = {};
  try { manifest = (await loadData('src/data/audioManifest.ts', root)).AUDIO_MANIFEST; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  let generated = 0;
  let reused = 0;
  for (const text of [...new Set(texts.map(normalize))]) {
    if (!text || Buffer.byteLength(text, 'utf8') > 5000) throw new Error('Each phrase must contain 1–5000 UTF-8 bytes.');
    const file = audioFile(text, voice);
    const target = resolve(root, 'public', file);
    if (manifest[text] === file) {
      try { if ((await stat(target)).size > 0) { reused++; continue; } } catch {}
    }
    const response = await fetchImpl('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'x-goog-user-project': projectId, 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: { text }, voice: { languageCode: 'ar-XA', name: voice }, audioConfig: { audioEncoding: 'MP3' } }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`Google Text-to-Speech returned HTTP ${response.status}. Check authentication, billing, API access, and quotas.`);
    const payload = await response.json();
    if (typeof payload.audioContent !== 'string' || !payload.audioContent) throw new Error('Google returned no audio.');
    const audio = Buffer.from(payload.audioContent, 'base64');
    if (!audio.length) throw new Error('Google returned invalid audio.');
    await writeFile(`${target}.tmp`, audio);
    await rename(`${target}.tmp`, target);
    manifest[text] = file;
    const manifestFile = resolve(root, 'src/data/audioManifest.ts');
    await writeFile(`${manifestFile}.tmp`, `// Generated by npm run audio:generate. Local audio files only.\nexport const AUDIO_MANIFEST: Record<string, string> = ${JSON.stringify(manifest, null, 2)};\n`);
    await rename(`${manifestFile}.tmp`, manifestFile);
    generated++;
    console.log(`Generated ${generated}/${texts.length}: ${text}`);
  }
  return { generated, reused };
}
async function main() {
  const args = process.argv.slice(2);
  const known = new Set(['--dry-run', '--all', '--include-phonetics', '--limit', '--voice']);
  let limit = 6;
  let voice = process.env.GOOGLE_TTS_VOICE || DEFAULT_VOICE;
  for (let i = 0; i < args.length; i++) {
    if (!known.has(args[i])) throw new Error(`Unknown option: ${args[i]}`);
    if (args[i] === '--limit') {
      limit = Number(args[++i]);
      if (!Number.isInteger(limit) || limit < 1) throw new Error('--limit must be a positive integer.');
    } else if (args[i] === '--voice') voice = args[++i];
  }
  if (typeof voice !== 'string' || !/^ar-XA-Chirp3-HD-[A-Za-z]+$/.test(voice)) throw new Error('Choose an ar-XA-Chirp3-HD voice.');
  const catalogue = await collectLessonTexts(args.includes('--include-phonetics'));
  const texts = args.includes('--all') ? catalogue : catalogue.slice(0, limit);
  console.log(`${texts.length} unique phrases, ${texts.reduce((n, text) => n + text.length, 0)} characters. Voice: ${voice}.`);
  if (args.includes('--dry-run')) { texts.forEach(text => console.log(text)); return; }
  let token = process.env.GOOGLE_CLOUD_ACCESS_TOKEN;
  if (!token) {
    try { token = execFileSync('gcloud', ['auth', 'print-access-token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
    catch { throw new Error('Google credentials are missing. Set GOOGLE_CLOUD_ACCESS_TOKEN locally or sign in with gcloud auth login.'); }
  }
  const result = await generateAudio({ texts, voice, token, projectId: process.env.GOOGLE_CLOUD_PROJECT });
  console.log(`Done: ${result.generated} generated, ${result.reused} reused. Rebuild the app to include the recordings.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
