import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, CheckCircle2, Mic, Square, ArrowRight } from 'lucide-react';
import { UserStats, VocabWord } from '../types';
import { VOCAB_WORDS } from '../data/vocabData';
import { GRAMMAR_LESSONS } from '../data/grammarData';
import { READING_PASSAGES } from '../data/readingData';
import { CONVERSATION_DIALOGUES } from '../data/conversationData';
import { AudioPlayerButton } from './AudioPlayerButton';
import { useArabicKeyboard } from '../hooks/useArabicKeyboard';
import { VirtualKeyboard } from './VirtualKeyboard';
import { arabicAudio, calculateArabicMatchScore, createArabicSpeechRecognizer, normalizeArabicText } from '../utils/audio';
import { calculateNextSRS, SRSItem } from '../utils/srs';
import { buildDailyLesson, dailyReward, localDate, readSaved, saveData, updateGrammarMistake, validSession, DailySession } from '../utils/dailyLesson';

interface Props {
  stats: UserStats;
  onComplete: (date: string, xp: number) => void;
}
function loadSession(stats: UserStats): DailySession {
  const saved = readSaved('fasaha_daily_lesson', null);
  if (validSession(saved, localDate())) return saved;
  const custom = readSaved<VocabWord[]>('fasaha_custom_vocab', []);
  const words = [...VOCAB_WORDS, ...(Array.isArray(custom) ? custom.filter(w => w &&
    typeof w.id === 'string' && typeof w.arabic === 'string' && typeof w.english === 'string') : [])];
  return buildDailyLesson(words, GRAMMAR_LESSONS, READING_PASSAGES, CONVERSATION_DIALOGUES, stats,
    readSaved('fasaha_srs_data', {}), readSaved('fasaha_grammar_mistakes', {}));
}

export function DailyLesson({ stats, onComplete }: Props) {
  const [session, setSession] = useState<DailySession>(() => loadSession(stats));
  const [typed, setTyped] = useState('');
  const keyboard = useArabicKeyboard(typed, setTyped, () => checkAnswer());
  const [choice, setChoice] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const recognizer = useRef<any>(null);
  const attempt = useRef(0);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const statsRef = useRef(stats);
  statsRef.current = stats;
  const step = session.steps[session.index];
  const result = session.results[session.index];
  const finished = session.index === session.steps.length;
  const button = 'px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm disabled:opacity-50';

  useEffect(() => { saveData('fasaha_daily_lesson', session); }, [session]);
  useEffect(() => {
    if (finished) onComplete(session.date, dailyReward(session.results));
  }, [finished, session, onComplete]);
  useEffect(() => () => {
    attempt.current++;
    recognizer.current?.abort();
    arabicAudio.stop();
  }, []);

  function stopListening() {
    attempt.current++;
    recognizer.current?.abort();
    recognizer.current = null;
    setListening(false);
  }
  function checkAnswer(answer = typed) {
    const current = sessionRef.current;
    const active = current.steps[current.index];
    if (!active || current.results[current.index]) return;
    if (active.options ? choice === null : !normalizeArabicText(answer)) return;
    const score = active.options ? (choice === active.correctIndex ? 100 : 0) : calculateArabicMatchScore(active.arabic, answer);
    const correct = score >= 80;
    const next = { ...current, results: [...current.results, { score, correct }] };
    sessionRef.current = next;
    setSession(next);
    saveData('fasaha_daily_lesson', next);
    stopListening();
    if (active.wordId) {
      const srs = readSaved<Record<string, SRSItem>>('fasaha_srs_data', {});
      const item = srs[active.wordId] || { id: active.wordId, interval: 1, repetition: 0, easinessFactor: 2.5, nextReviewDate: '' };
      saveData('fasaha_srs_data', { ...srs, [active.wordId]: calculateNextSRS(item, correct ? 4 : 1) });
    }
    if (active.grammarKey) updateGrammarMistake(active.grammarKey, correct);
    arabicAudio.playChime(correct ? 'correct' : 'wrong');
  }
  async function startListening() {
    stopListening();
    const token = attempt.current;
    setListening(true);
    setSpeechStatus('Listening… Speak the full phrase.');
    const rec = await createArabicSpeechRecognizer((text, final) => {
      if (token !== attempt.current) return;
      setTyped(text);
      if (final) { setSpeechStatus('Speech recognized.'); checkAnswer(text); }
    }, message => { if (token === attempt.current) setSpeechStatus(message); },
    () => { if (token === attempt.current) setListening(false); });
    if (token !== attempt.current) { rec?.abort(); return; }
    if (!rec) { setListening(false); return; }
    recognizer.current = rec;
    try { rec.start(); } catch { setListening(false); setSpeechStatus('Unable to start. You can type the phrase instead.'); }
  }
  function nextStep() {
    stopListening();
    arabicAudio.stop();
    setTyped(''); setChoice(null); setSpeechStatus('');
    const current = sessionRef.current;
    if (!current.results[current.index]) return;
    const next = { ...current, index: current.index + 1 };
    sessionRef.current = next;
    saveData('fasaha_daily_lesson', next);
    setSession(next);
  }
  useEffect(() => {
    const refreshDay = () => {
      if (localDate() !== sessionRef.current.date) {
        stopListening();
        setTyped(''); setChoice(null); setSpeechStatus('');
        setSession(loadSession(statsRef.current));
      }
    };
    const timer = window.setInterval(refreshDay, 60000);
    document.addEventListener('visibilitychange', refreshDay);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', refreshDay); };
  }, []);
  const weak = session.steps.filter((_, index) => session.results[index] && !session.results[index].correct);
  return <div className="space-y-6 animate-fadeIn">
    <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-950 text-white p-6 md:p-8 space-y-3">
      <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider"><CalendarDays size={16} /> Your daily routine · About 10 minutes</div>
      <h2 className="text-3xl font-extrabold">Today’s Lesson <span className="font-arabic" lang="ar">درس اليوم</span></h2>
      <p className="text-sm text-emerald-100">A little vocabulary, listening, grammar, and conversation. Pick up where you left off.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      {finished ? <div className="space-y-5">
        <CheckCircle2 className="text-emerald-500" size={40} />
        <h3 className="text-2xl font-bold">You’ve completed today’s lesson!</h3>
        <p>{session.results.filter(r => r.correct).length} of {session.steps.length} exercises correct · {dailyReward(session.results)} XP for this lesson</p>
        <ul className="space-y-2">{session.steps.map((s, i) => <li key={s.id} className="flex justify-between gap-3 text-sm"><span>{s.title}</span><span className={session.results[i].correct ? 'text-emerald-600' : 'text-amber-600'}>{session.results[i].score}%</span></li>)}</ul>
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 space-y-1"><h4 className="font-bold">Your goal for tomorrow</h4><p className="text-sm">{weak.length ? `Practice ${weak[0].title.toLowerCase()} again, then review your due words.` : 'Review your next due words and keep your daily streak going.'}</p></div>
        <p className="text-xs text-slate-500">Your next lesson will be ready tomorrow. Continue exploring the learning modules today.</p>
      </div> : <>
        <div className="flex flex-wrap justify-between gap-2 text-xs font-bold text-slate-500"><span>Exercise {session.index + 1} of {session.steps.length}</span><span className="capitalize">{step.kind}</span></div>
        <div role="progressbar" aria-label="Lesson progress" aria-valuenow={session.index} aria-valuemin={0} aria-valuemax={session.steps.length} className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${session.index / session.steps.length * 100}%` }} /></div>
        <h3 className="text-xl font-bold">{step.title}</h3><p className="text-sm">{step.prompt}</p>
        {step.kind !== 'dictation' && step.arabic && <p className="font-arabic text-3xl leading-loose text-center" dir="rtl" lang="ar">{step.arabic}</p>}
        {step.kind === 'conversation' && <p className="text-center text-sm text-slate-500">{step.english}</p>}
        {step.arabic && <AudioPlayerButton text={step.arabic} title={step.kind === 'dictation' ? 'Listen to the sentence' : undefined} label={step.kind === 'dictation' ? 'Listen to the sentence' : 'Listen'} variant="primary" />}
        {step.options ? <div className="grid sm:grid-cols-2 gap-3">{step.options.map((option, index) => <button type="button" key={index} disabled={!!result} aria-pressed={choice === index} onClick={() => setChoice(index)} className={`p-4 rounded-2xl border text-sm ${choice === index ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100' : 'border-slate-200 dark:border-slate-700'}`}>{option}</button>)}</div>
          : <div className="space-y-3"><label htmlFor="daily-answer" className="text-sm font-bold">Your answer</label><textarea {...keyboard.inputProps} id="daily-answer" dir="rtl" lang="ar" rows={2} value={typed} disabled={!!result} onChange={e => setTyped(e.target.value)} className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 font-arabic text-2xl" />
            {step.kind === 'conversation' && !result && <button type="button" onClick={listening ? stopListening : startListening} className={button}>{listening ? <Square className="inline mr-2" size={16} /> : <Mic className="inline mr-2" size={16} />}{listening ? 'Stop listening' : 'Practice with microphone'}</button>}
            {speechStatus && <p role="status" className="text-sm text-slate-500">{speechStatus}</p>}
            {!result && <VirtualKeyboard {...keyboard.keyboardProps} />}
          </div>}
        {result ? <div className="space-y-4" aria-live="polite"><div className={`p-4 rounded-2xl ${result.correct ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'bg-amber-50 dark:bg-amber-950/40'}`}><p className="font-bold">{result.correct ? 'Well done!' : 'Keep practicing.'} {result.score}% match</p>
          {step.options ? <p className="mt-2">Correct answer: {step.options[step.correctIndex!]}</p> : <><p className="font-arabic text-2xl mt-2" dir="rtl" lang="ar">{step.arabic}</p><p className="text-sm mt-2">{step.english}</p></>}
          {step.explanation && <p className="text-sm mt-2">{step.explanation}</p>}</div><button type="button" onClick={nextStep} className={button}>{session.index === session.steps.length - 1 ? 'Finish lesson' : 'Next exercise'} <ArrowRight className="inline ml-2" size={16} /></button></div>
          : <button type="button" onClick={() => checkAnswer()} disabled={step.options ? choice === null : !normalizeArabicText(typed)} className={button}>Check answer</button>}
      </>}
    </div>
  </div>;
}
