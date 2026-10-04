import React, { useState } from 'react';
import { Sparkles, Volume2, Info, BookOpen, PenTool, CheckCircle, HelpCircle, Layers } from 'lucide-react';
import { ALPHABET_DATA } from '../data/alphabetData';
import { HARAKAT_DATA } from '../data/harakatData';
import { ArabicLetter } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { LetterCanvas } from './LetterCanvas';
import { arabicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AlphabetModuleProps {
  onAddXp: (amount: number) => void;
  completedLetters: number[];
  onToggleCompleteLetter: (id: number) => void;
}

export const AlphabetModule: React.FC<AlphabetModuleProps> = ({
  onAddXp,
  completedLetters,
  onToggleCompleteLetter,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ALPHABET_DATA[0]);
  const [activeTab, setActiveTab] = useState<'letters' | 'harakat' | 'quiz'>('letters');
  const [filterType, setFilterType] = useState<'all' | 'sun' | 'moon' | 'emphatic' | 'nonconnector'>('all');
  
  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const filteredLetters = ALPHABET_DATA.filter((l) => {
    if (filterType === 'sun') return l.type === 'sun';
    if (filterType === 'moon') return l.type === 'moon';
    if (filterType === 'emphatic') return l.isEmphatic;
    if (filterType === 'nonconnector') return l.isNonConnector;
    return true;
  });

  // Quiz questions generation
  const quizItems = [
    {
      prompt: 'Which letter produces the unvoiced "th" sound as in "think"?',
      audioText: 'ث',
      options: ['ث (Thaa)', 'س (Seen)', 'ت (Taa)', 'ذ (Thaal)'],
      correct: 0,
      explanation: 'The letter Thaa (ث) makes the soft "th" sound in "three".'
    },
    {
      prompt: 'Listen to the sound and identify the correct Arabic letter:',
      audioText: 'ص',
      options: ['س (Seen - plain s)', 'ص (Saad - emphatic S)', 'ش (Sheen)', 'ز (Zaay)'],
      correct: 1,
      explanation: 'Saad (ص) is the heavy emphatic S sound produced with back of tongue raised.'
    },
    {
      prompt: 'Which of the following is a NON-CONNECTING letter that never joins on the left?',
      audioText: 'د',
      options: ['ب (Baa)', 'م (Meem)', 'د (Daal)', 'ل (Laam)'],
      correct: 2,
      explanation: 'Daal (د) is one of the 6 non-connecting letters (د، ذ، ر، ز، و، ا).'
    },
    {
      prompt: 'Identify the short vowel mark that produces an "a" sound above the letter (فَتْحَة):',
      audioText: 'بَ',
      options: ['Fatha ( َ )', 'Damma ( ُ )', 'Kasra ( ِ )', 'Sukun ( ْ )'],
      correct: 0,
      explanation: 'Fatha is the small diagonal stroke placed on top of a letter for "a".'
    }
  ];

  const handleSelectLetter = (letter: ArabicLetter) => {
    arabicAudio.playChime('click');
    setSelectedLetter(letter);
  };

  const handleCheckQuizAnswer = (optionIdx: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(optionIdx);
    setIsAnswerChecked(true);

    const isCorrect = optionIdx === quizItems[quizQuestionIndex].correct;
    if (isCorrect) {
      arabicAudio.playChime('correct');
      setQuizScore((prev) => prev + 1);
      onAddXp(20);
    } else {
      arabicAudio.playChime('wrong');
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizQuestionIndex + 1 < quizItems.length) {
      setQuizQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setQuizFinished(true);
      arabicAudio.playChime('celebrate');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">أ ب ت</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700/80 text-emerald-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Step 1: Foundational Elements
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            The Arabic Alphabet & Phonetics (الأبجدية والأصوات)
          </h2>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
            Arabic has 28 consonants written right-to-left in flowing cursive. Learn each letter's 4 distinct positional shapes, points of articulation (Makhraj), and vowel marks.
          </p>

          {/* Module Subtabs */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('letters')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'letters'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <BookOpen className="w-4 h-4" /> 28 Letters & Shapes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('harakat')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'harakat'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <Layers className="w-4 h-4" /> Harakat & Vowels (التشكيل)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/70'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Phonetics Quiz
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 28 LETTERS EXPLORER & CANVAS */}
      {activeTab === 'letters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Letter Grid & Filters (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400 font-medium px-2">Filter:</span>
              {[
                { id: 'all', label: 'All (28)' },
                { id: 'sun', label: '☀️ Sun Letters (14)' },
                { id: 'moon', label: '🌙 Moon Letters (14)' },
                { id: 'emphatic', label: '🔥 Emphatic Sounds' },
                { id: 'nonconnector', label: '⚡ Non-Connectors' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterType(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                    filterType === f.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Letter Cards Grid (RTL layout) */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5" dir="rtl">
              {filteredLetters.map((l) => {
                const isSelected = selectedLetter.id === l.id;
                const isCompleted = completedLetters.includes(l.id);

                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleSelectLetter(l)}
                    className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 group text-center border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400 ring-offset-2 shadow-lg scale-105 z-10'
                        : isCompleted
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/30 text-slate-800 dark:text-slate-200 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm'
                    }`}
                  >
                    {isCompleted && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    )}

                    <span className="font-arabic text-3xl font-bold mb-1 group-hover:scale-110 transition-transform">
                      {l.letter}
                    </span>
                    <span className={`text-[11px] font-bold tracking-tight ${isSelected ? 'text-emerald-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      {l.nameEn}
                    </span>
                    <span className={`text-[9px] ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {l.transliteration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Letter Detail & Tracing Studio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Letter Master Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
              {/* Header with pronunciation audio */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedLetter.nameEn}
                    </h3>
                    <span className="font-arabic text-lg text-emerald-600 font-bold">
                      ({selectedLetter.nameAr})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transliteration: <strong className="text-slate-800 dark:text-slate-200">{selectedLetter.transliteration}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <AudioPlayerButton
                    text={selectedLetter.letter}
                    variant="primary"
                    size="md"
                    label="Listen"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onToggleCompleteLetter(selectedLetter.id);
                      if (!completedLetters.includes(selectedLetter.id)) {
                        onAddXp(25);
                        arabicAudio.playChime('celebrate');
                      }
                    }}
                    title="Mark as learned"
                    className={`p-2 rounded-xl border transition ${
                      completedLetters.includes(selectedLetter.id)
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-400 hover:text-emerald-600 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Big Letter Feature Showcase */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl p-6 text-center border border-emerald-100 dark:border-emerald-900/40">
                <span className="font-arabic text-7xl font-bold text-emerald-700 dark:text-emerald-400 block my-2">
                  {selectedLetter.letter}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {selectedLetter.pronunciationGuide}
                </p>
              </div>

              {/* Makhraj / Articulation Point */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" /> Point of Articulation (المَخْرَج):
                </span>
                <p className="text-slate-600 dark:text-slate-400 pl-5">
                  {selectedLetter.makhraj}
                </p>
              </div>

              {/* 4 Positional Forms */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  4 Positional Forms (أشكال الحرف)
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center" dir="rtl">
                  {[
                    { label: 'Isolated (منفصل)', val: selectedLetter.forms.isolated },
                    { label: 'Initial (بداية)', val: selectedLetter.forms.initial },
                    { label: 'Medial (وسط)', val: selectedLetter.forms.medial },
                    { label: 'Final (نهاية)', val: selectedLetter.forms.final },
                  ].map((pos, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      <span className="font-arabic text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">
                        {pos.val}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {pos.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Short Vowels (Harakat) on this letter */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Pronunciation with Harakat
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { arabic: selectedLetter.vowels.fatha, translit: selectedLetter.vowels.fathaTranslit, label: 'Fatḥah (َ)' },
                    { arabic: selectedLetter.vowels.damma, translit: selectedLetter.vowels.dammaTranslit, label: 'Ḍammah (ُ)' },
                    { arabic: selectedLetter.vowels.kasra, translit: selectedLetter.vowels.kasraTranslit, label: 'Kasrah (ِ)' },
                    { arabic: selectedLetter.vowels.sukun, translit: selectedLetter.vowels.sukunTranslit, label: 'Sukūn (ْ)' },
                  ].map((vh, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => arabicAudio.speak(vh.arabic)}
                      className="p-2 bg-emerald-50/50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/60 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 transition group"
                    >
                      <span className="font-arabic text-2xl font-bold text-slate-900 dark:text-slate-100 block group-hover:text-emerald-600">
                        {vh.arabic}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {vh.translit}
                      </span>
                      <span className="text-[9px] text-slate-400 block">
                        {vh.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Example Word */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/60 rounded-2xl border border-emerald-200/80 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Example Word:
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-arabic text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedLetter.exampleWord.arabic}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      ({selectedLetter.exampleWord.transliteration} = <em>{selectedLetter.exampleWord.english}</em>)
                    </span>
                  </div>
                </div>
                <AudioPlayerButton
                  text={selectedLetter.exampleWord.arabic}
                  size="sm"
                  variant="primary"
                />
              </div>

              {/* Calligraphy Tracing Canvas for this letter */}
              <LetterCanvas
                guideLetter={selectedLetter.letter}
                guideSubtext={`${selectedLetter.nameEn} - ${selectedLetter.transliteration}`}
                height={220}
                onCompleted={() => {
                  onToggleCompleteLetter(selectedLetter.id);
                  onAddXp(20);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HARAKAT & DIACRITICS GUIDE */}
      {activeTab === 'harakat' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Arabic Diacritical Marks (الحَرَكَاتُ وَالتَّشْكِيلُ)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Arabic consonants are vocalized by Harakat placed above or below letters. Short vowels define meaning and grammar. Click any mark to hear its sound:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {HARAKAT_DATA.map((h) => (
                <div
                  key={h.id}
                  className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 hover:border-emerald-500 transition group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-arabic text-4xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      {h.withSample}
                    </span>
                    <AudioPlayerButton
                      text={h.withSample}
                      size="sm"
                      variant="primary"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-base">
                      {h.nameEn}
                      <span className="font-arabic text-sm text-slate-500">({h.nameAr})</span>
                    </h4>
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-md mt-1">
                      {h.sound}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PHONETICS & RECOGNITION QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Question {quizQuestionIndex + 1} of {quizItems.length}
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
                  Score: {quizScore}
                </span>
              </div>

              {/* Question prompt */}
              <div className="space-y-3 text-center py-2">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                  {quizItems[quizQuestionIndex].prompt}
                </h3>
                {quizItems[quizQuestionIndex].audioText && (
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <AudioPlayerButton
                      text={quizItems[quizQuestionIndex].audioText}
                      label="Play Audio Clip"
                      variant="primary"
                      size="lg"
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {quizItems[quizQuestionIndex].options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === quizItems[quizQuestionIndex].correct;
                  let btnStyle = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-500 shadow-md';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-600 text-white border-rose-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerChecked}
                      onClick={() => handleCheckQuizAnswer(idx)}
                      className={`p-4 rounded-2xl border text-sm font-bold text-left transition active:scale-98 ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button */}
              {isAnswerChecked && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 animate-fadeIn">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Explanation:</strong> {quizItems[quizQuestionIndex].explanation}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextQuizQuestion}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    {quizQuestionIndex + 1 < quizItems.length ? 'Next Question ➔' : 'View Results 🎉'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                🏆
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Alphabet Mastery Quiz Completed!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You scored <strong className="text-emerald-600">{quizScore}</strong> out of {quizItems.length}!
              </p>
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
