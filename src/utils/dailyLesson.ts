import type { VocabWord, GrammarLesson, ConversationDialogue, ReadingPassage, UserStats } from '../types';
import { recordActivity } from './streak';
import { isDueForReview, type SRSItem } from './srs';

export interface LessonStep {
  id: string;
  kind: 'vocabulary' | 'dictation' | 'grammar' | 'conversation';
  title: string;
  prompt: string;
  arabic: string;
  english: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  wordId?: string;
  grammarKey?: string;
}
export interface DailySession {
  date: string;
  steps: LessonStep[];
  results: { score: number; correct: boolean }[];
  index: number;
}
export function localDate(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
export function readSaved<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}
export function saveData(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Continue in memory. */ }
}
export function buildDailyLesson(
  words: VocabWord[], lessons: GrammarLesson[], passages: ReadingPassage[], dialogues: ConversationDialogue[],
  stats: UserStats, srs: Record<string, SRSItem>, mistakes: Record<string, number>, now = new Date()
): DailySession {
  srs = srs && typeof srs === 'object' ? srs : {};
  mistakes = mistakes && typeof mistakes === 'object' ? mistakes : {};
  const date = localDate(now);
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const due = words.filter(w => srs[w.id] && isDueForReview(srs[w.id], now.getTime()));
  due.sort((a, b) => Date.parse(srs[a.id].nextReviewDate) - Date.parse(srs[b.id].nextReviewDate));
  const fresh = words.filter(w => !srs[w.id] && !stats.masteredVocab.includes(w.id));
  // Rotate new words each day, keeping overdue reviews first.
  const offset = fresh.length ? day % fresh.length : 0;
  const selected = [...due, ...fresh.slice(offset), ...fresh.slice(0, offset)].slice(0, 3);
  const steps: LessonStep[] = selected.map((word, index) => {
    const choices = [word.english, ...[...new Set(words.map(w => w.english))].filter(e => e !== word.english).slice(0, 3)];
    const shift = (day + index) % choices.length;
    const options = [...choices.slice(shift), ...choices.slice(0, shift)];
    return { id: `vocab:${word.id}`, kind: 'vocabulary', title: srs[word.id] ? 'Due vocabulary review' : 'Learn a new word',
      prompt: 'Choose the meaning of this word.', arabic: word.arabic, english: word.english,
      options, correctIndex: options.indexOf(word.english), wordId: word.id };
  });
  const passage = passages.find(p => !stats.completedReading.includes(p.id)) || passages[day % passages.length];
  const sentence = passage?.sentences[day % passage.sentences.length];
  if (sentence) steps.push({ id: `dictation:${passage.id}:${sentence.id}`, kind: 'dictation', title: 'Listen and write',
    prompt: 'Listen to the sentence, then type what you hear. Vowel marks are optional.', arabic: sentence.arabic, english: sentence.english });
  const questions = lessons.flatMap(lesson => lesson.quiz.map(q => ({ lesson, q, key: `${lesson.id}:${q.id}` })));
  questions.sort((a, b) => (mistakes[b.key] || 0) - (mistakes[a.key] || 0) ||
    Number(stats.completedGrammar.includes(a.lesson.id)) - Number(stats.completedGrammar.includes(b.lesson.id)));
  const question = questions[0];
  if (question) steps.push({ id: `grammar:${question.key}`, kind: 'grammar', title: question.lesson.titleEn,
    prompt: question.q.question, arabic: question.q.arabicText || '', english: '', options: question.q.options,
    correctIndex: question.q.correctIndex, explanation: question.q.explanation, grammarKey: question.key });
  const dialogue = dialogues.find(d => !stats.completedDialogues.includes(d.id)) || dialogues[day % dialogues.length];
  const line = dialogue?.dialogue[day % dialogue.dialogue.length];
  if (line) steps.push({ id: `conversation:${dialogue.id}:${line.id}`, kind: 'conversation', title: dialogue.titleEn,
    prompt: 'Listen and say the phrase aloud. Use the microphone to check it, or type it from memory.',
    arabic: line.arabic, english: line.english, explanation: line.grammarTip });
  return { date, steps, results: [], index: 0 };
}
export function updateGrammarMistake(key: string, correct: boolean): void {
  const saved = readSaved<Record<string, number>>('fasaha_grammar_mistakes', {});
  const mistakes = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  mistakes[key] = correct ? 0 : (Number(mistakes[key]) || 0) + 1;
  saveData('fasaha_grammar_mistakes', mistakes);
}
export function dailyReward(results: DailySession['results']): number {
  return 10 + results.filter(result => result.correct).length * 10;
}
export function validSession(value: unknown, date: string): value is DailySession {
  const s = value as DailySession;
  return !!s && s.date === date && Array.isArray(s.steps) && s.steps.length > 0 &&
    s.steps.every(step => step && typeof step.id === 'string' && typeof step.arabic === 'string' &&
      ['vocabulary', 'dictation', 'grammar', 'conversation'].includes(step.kind) &&
      (step.options === undefined || (Array.isArray(step.options) && typeof step.correctIndex === 'number' &&
        step.correctIndex >= 0 && step.correctIndex < step.options.length))) &&
    Array.isArray(s.results) && s.results.every(r => r && Number.isFinite(r.score) && typeof r.correct === 'boolean') &&
    Number.isInteger(s.index) && s.index >= 0 && s.index <= s.steps.length &&
    s.results.length >= s.index && s.results.length <= Math.min(s.index + 1, s.steps.length);
}

// A finished lesson may be reopened or restored; its reward belongs to that date.
export function claimDailyReward(stats: UserStats, date: string, xp: number): UserStats {
  const completed = stats.completedDailyLessons || {};
  if (Object.prototype.hasOwnProperty.call(completed, date)) return stats;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(xp) || xp < 0) return stats;
  return { ...recordActivity(stats), xp: stats.xp + xp, completedDailyLessons: { ...completed, [date]: xp } };
}
