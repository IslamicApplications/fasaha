import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, HelpCircle, Cpu } from 'lucide-react';
import { GRAMMAR_LESSONS, VERB_CONJUGATION_BANK, ConjugationVerb } from '../data/grammarData';
import { GrammarLesson } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GrammarModuleProps {
  onAddXp: (amount: number) => void;
  completedGrammar: string[];
  onToggleCompleteGrammar: (id: string) => void;
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({
  onAddXp,
  completedGrammar = [],
  onToggleCompleteGrammar,
}) => {
  const safeCompleted = completedGrammar || [];
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'conjugator'>('lessons');

  // Verb conjugator state
  const [selectedVerb, setSelectedVerb] = useState<ConjugationVerb>(VERB_CONJUGATION_BANK[0]);
  const [selectedTense, setSelectedTense] = useState<'past' | 'present' | 'imperative'>('present');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectLesson = (lesson: GrammarLesson) => {
    arabicAudio.playChime('click');
    setSelectedLesson(lesson);
    setQuizAnswers({});
    setShowResults(false);
  };

  const handleCheckQuiz = () => {
    setShowResults(true);
    let correct = 0;
    selectedLesson.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    if (correct === selectedLesson.quiz.length) {
      onAddXp(30);
      onToggleCompleteGrammar(selectedLesson.id);
      arabicAudio.playChime('celebrate');
      confetti({ particleCount: 80, spread: 60 });
    } else {
      arabicAudio.playChime('correct');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">قواعد</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-800/80 text-purple-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Step 4: Grammar Engine
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Arabic Grammar & Syntax (قَوَاعِدُ اللُّغَةِ العَرَبِيَّةِ)
          </h2>
          <p className="text-purple-100/90 text-sm md:text-base leading-relaxed">
            Understand the architectural logic of Arabic grammar: gender rules, definite sun/moon articles, possessive Idafa, and past/present verb conjugations.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'lessons'
                  ? 'bg-white text-purple-950 shadow-md'
                  : 'bg-purple-950/40 text-purple-100 hover:bg-purple-950/70'
              }`}
            >
              <BookOpen className="w-4 h-4" /> 8 Essential Lessons
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('conjugator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'conjugator'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-purple-950/40 text-purple-100 hover:bg-purple-950/70'
              }`}
            >
              <Cpu className="w-4 h-4" /> Live Verb Conjugator Simulator
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 8 LESSONS & QUIZZES */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Lesson Directory (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Curriculum Lessons ({GRAMMAR_LESSONS.length})
            </h3>

            {GRAMMAR_LESSONS.map((lesson, idx) => {
              const isSelected = selectedLesson.id === lesson.id;
              const isDone = safeCompleted.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => handleSelectLesson(lesson)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-purple-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-purple-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-purple-600'
                        }`}
                      >
                        Lesson {idx + 1}
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                        {lesson.level}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm leading-snug">{lesson.titleEn}</h4>
                    <p className="font-arabic text-sm opacity-90" dir="rtl">
                      {lesson.titleAr}
                    </p>
                  </div>

                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Lesson Detail & Quiz (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
              {/* Header */}
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  Level {selectedLesson.level} • Comprehensive Guide
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedLesson.titleEn}
                </h3>
                <p className="font-arabic text-xl text-purple-700 dark:text-purple-400 mt-0.5 font-bold" dir="rtl">
                  {selectedLesson.titleAr}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {selectedLesson.summary}
                </p>
              </div>

              {/* Key Rule Box */}
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 block mb-1">
                  🔑 The Golden Rule:
                </span>
                <p className="text-sm font-semibold text-purple-950 dark:text-purple-100 leading-relaxed">
                  {selectedLesson.keyRule}
                </p>
              </div>

              {/* Detailed Content Sections */}
              <div className="space-y-6">
                {selectedLesson.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sec.content}
                    </p>

                    {/* Examples Cards */}
                    <div className="space-y-2 pt-1">
                      {sec.examples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <p className="font-arabic text-2xl font-bold text-purple-700 dark:text-purple-400" dir="rtl">
                              {ex.arabic}
                            </p>
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              {ex.transliteration} ➔ <em>{ex.english}</em>
                            </p>
                            {ex.highlight && (
                              <span className="inline-block text-[10px] text-purple-600 dark:text-purple-400 bg-purple-100/70 dark:bg-purple-950 px-2 py-0.5 rounded">
                                Rule focus: {ex.highlight}
                              </span>
                            )}
                          </div>
                          <AudioPlayerButton text={ex.arabic} size="sm" variant="ghost" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Quiz for this Lesson */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  Knowledge Check Quiz
                </h4>

                <div className="space-y-4">
                  {selectedLesson.quiz.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isChosen = quizAnswers[q.id] === oIdx;
                          const isCorrect = oIdx === q.correctIndex;
                          let btnStyle = 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

                          if (showResults) {
                            if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-500';
                            else if (isChosen) btnStyle = 'bg-rose-600 text-white border-rose-500';
                          } else if (isChosen) {
                            btnStyle = 'bg-purple-600 text-white border-purple-500';
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIdx })}
                              className={`p-3 rounded-xl border text-xs font-semibold text-left transition ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <p className="text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
                          💡 {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleCheckQuiz}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    Check Answers & Complete Lesson (+30 XP)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE VERB CONJUGATION SIMULATOR */}
      {activeTab === 'conjugator' && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-600" />
                Live Arabic Verb Conjugation Engine
              </h3>
              <p className="text-xs text-slate-500">
                Select a 3-letter root verb and switch between Past, Present, and Imperative tenses to see the pronoun matrix.
              </p>
            </div>

            {/* Tense switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setSelectedTense('past')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedTense === 'past' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Past (الفعل الماضي)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTense('present')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedTense === 'present' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Present (الفعل المضارع)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTense('imperative')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedTense === 'imperative' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Command (فعل الأمر)
              </button>
            </div>
          </div>

          {/* Verb Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-semibold text-slate-400 shrink-0">Choose Root:</span>
            {VERB_CONJUGATION_BANK.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  arabicAudio.playChime('click');
                  setSelectedVerb(v);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedVerb.id === v.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {v.meaning} (Root: {v.root})
              </button>
            ))}
          </div>

          {/* Conjugation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2" dir="rtl">
            {selectedTense !== 'imperative' ? (
              [
                { pronoun: 'أَنَا (I)', form: selectedVerb[selectedTense].ana },
                { pronoun: 'أَنْتَ (You - m)', form: selectedVerb[selectedTense].anta },
                { pronoun: 'أَنْتِ (You - f)', form: selectedVerb[selectedTense].anti },
                { pronoun: 'هُوَ (He)', form: selectedVerb[selectedTense].huwa },
                { pronoun: 'هِيَ (She)', form: selectedVerb[selectedTense].hiya },
                { pronoun: 'نَحْنُ (We)', form: selectedVerb[selectedTense].nahnu },
                { pronoun: 'أَنْتُمْ (You all - m)', form: selectedVerb[selectedTense].antum },
                { pronoun: 'هُمْ (They - m)', form: selectedVerb[selectedTense].hum },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 hover:border-purple-400 transition shadow-sm"
                >
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                    {item.pronoun}
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="font-arabic text-2xl font-bold text-purple-700 dark:text-purple-400">
                      {item.form}
                    </span>
                    <AudioPlayerButton text={item.form} size="sm" variant="ghost" />
                  </div>
                </div>
              ))
            ) : (
              [
                { pronoun: 'أَنْتَ (You - m)', form: selectedVerb.imperative.anta },
                { pronoun: 'أَنْتِ (You - f)', form: selectedVerb.imperative.anti },
                { pronoun: 'أَنْتُمْ (You all - m)', form: selectedVerb.imperative.antum },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1 hover:border-purple-400 transition shadow-sm"
                >
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                    {item.pronoun}
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="font-arabic text-2xl font-bold text-purple-700 dark:text-purple-400">
                      {item.form}
                    </span>
                    <AudioPlayerButton text={item.form} size="sm" variant="ghost" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
