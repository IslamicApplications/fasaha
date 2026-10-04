import React, { useState } from 'react';
import { Cpu, Sparkles, BookOpen, Volume2, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { ARABIC_ROOTS, ROOT_QUIZ_QUESTIONS, ArabicRoot } from '../data/morphologyData';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface MorphologyLabProps {
  onAddXp: (amount: number) => void;
}

export const MorphologyLab: React.FC<MorphologyLabProps> = ({ onAddXp }) => {
  const [selectedRoot, setSelectedRoot] = useState<ArabicRoot>(ARABIC_ROOTS[0]);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'game'>('visualizer');

  // Root Game state
  const [gameIdx, setGameIdx] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameSelected, setGameSelected] = useState<number | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const handleGameAnswer = (idx: number) => {
    if (gameSelected !== null) return;
    setGameSelected(idx);

    const isCorrect = idx === ROOT_QUIZ_QUESTIONS[gameIdx].correct;
    if (isCorrect) {
      arabicAudio.playChime('correct');
      setGameScore((prev) => prev + 1);
      onAddXp(20);
    } else {
      arabicAudio.playChime('wrong');
    }
  };

  const handleNextGame = () => {
    if (gameIdx + 1 < ROOT_QUIZ_QUESTIONS.length) {
      setGameIdx((prev) => prev + 1);
      setGameSelected(null);
    } else {
      setGameFinished(true);
      arabicAudio.playChime('celebrate');
      confetti({ particleCount: 80 });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-900 to-purple-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">صرف</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-800/80 text-violet-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" /> Morphology & Root Anatomy
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            The Arabic Root & Pattern Lab (عِلْمُ الصَّرْفِ وَالمِيزَانُ)
          </h2>
          <p className="text-violet-100/90 text-sm md:text-base leading-relaxed">
            Over 85% of Arabic vocabulary stems from 3-letter roots plugged into morphological molds (*Awzān* / الأوزان). Learn one root to instantly unlock entire word families!
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('visualizer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'visualizer'
                  ? 'bg-white text-violet-950 shadow-md'
                  : 'bg-violet-950/40 text-violet-100 hover:bg-violet-950/70'
              }`}
            >
              <Cpu className="w-4 h-4" /> Root & Pattern Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'game'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-violet-950/40 text-violet-100 hover:bg-violet-950/70'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Root Extraction Game
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: ROOT & PATTERN VISUALIZER */}
      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Root Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Select a 3-Letter Root (الجذر الثلاثي)
            </h3>
            {ARABIC_ROOTS.map((root) => {
              const isSelected = selectedRoot.id === root.id;

              return (
                <button
                  key={root.id}
                  type="button"
                  onClick={() => {
                    arabicAudio.playChime('click');
                    setSelectedRoot(root);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-500 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-violet-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-arabic text-2xl font-bold tracking-wider" dir="rtl">
                        {root.rootAr}
                      </span>
                    </div>
                    <p className={`text-xs ${isSelected ? 'text-violet-100' : 'text-slate-500'}`}>
                      {root.primaryMeaning}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isSelected ? 'bg-violet-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                    {root.derivatives.length} Words
                  </span>
                </button>
              );
            })}
          </div>

          {/* Root Word Family Matrix (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
              {/* Root Focus Showcase */}
              <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-slate-950 dark:to-violet-950/30 rounded-3xl border border-violet-200 dark:border-violet-900/40 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                  Active Root Essence:
                </span>
                <div className="font-arabic text-5xl font-bold text-slate-900 dark:text-white my-2" dir="rtl">
                  {selectedRoot.rootAr}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Primary Concept: <strong>{selectedRoot.primaryMeaning}</strong>
                </p>
              </div>

              {/* Derivatives Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Morphological Derivatives (*Awzān* / الأوزان):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRoot.derivatives.map((word, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 hover:border-violet-400 transition group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 rounded-md">
                          Scale: {word.patternScale}
                        </span>
                        <AudioPlayerButton text={word.arabic} size="sm" variant="ghost" />
                      </div>

                      <div className="flex items-baseline justify-between" dir="rtl">
                        <span className="font-arabic text-3xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                          {word.arabic}
                        </span>
                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                          {word.transliteration}
                        </span>
                      </div>

                      <div>
                        <strong className="text-sm text-slate-900 dark:text-white block">
                          {word.english}
                        </strong>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {word.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROOT EXTRACTION GAME */}
      {activeTab === 'game' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          {!gameFinished ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider">
                  Challenge {gameIdx + 1} of {ROOT_QUIZ_QUESTIONS.length}
                </span>
                <span className="font-bold px-3 py-1 bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 rounded-full">
                  Score: {gameScore}
                </span>
              </div>

              <div className="text-center py-4 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Identify the 3-letter root for:
                </span>
                <h3 className="font-arabic text-4xl font-bold text-slate-900 dark:text-white" dir="rtl">
                  {ROOT_QUIZ_QUESTIONS[gameIdx].word}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {ROOT_QUIZ_QUESTIONS[gameIdx].options.map((opt, oIdx) => {
                  const isSelected = gameSelected === oIdx;
                  const isCorrect = oIdx === ROOT_QUIZ_QUESTIONS[gameIdx].correct;
                  let style = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';

                  if (gameSelected !== null) {
                    if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-500 shadow-md';
                    else if (isSelected) style = 'bg-rose-600 text-white border-rose-500';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={gameSelected !== null}
                      onClick={() => handleGameAnswer(oIdx)}
                      className={`p-4 rounded-2xl border text-xl font-arabic font-bold text-center transition ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {gameSelected !== null && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-fadeIn">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Explanation:</strong> {ROOT_QUIZ_QUESTIONS[gameIdx].explanation}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextGame}
                    className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    {gameIdx + 1 < ROOT_QUIZ_QUESTIONS.length ? 'Next Word ➔' : 'Complete Challenge 🎉'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-violet-100 dark:bg-violet-950 text-violet-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                🌟
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Root Master Challenge Complete!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You correctly extracted <strong className="text-violet-600">{gameScore}</strong> roots!
              </p>
              <button
                type="button"
                onClick={() => {
                  setGameIdx(0);
                  setGameScore(0);
                  setGameSelected(null);
                  setGameFinished(false);
                }}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                Restart Game
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
