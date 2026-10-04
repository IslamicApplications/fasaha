import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Volume2, Sparkles, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { arabicAudio, calculateArabicMatchScore, normalizeArabicText } from '../utils/audio';
import confetti from 'canvas-confetti';

import { DICTATION_BANK } from '../data/dictationData';

interface DictationStudioProps {
  onAddXp: (amount: number) => void;
}

export const DictationStudio: React.FC<DictationStudioProps> = ({ onAddXp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85);
  const [evaluatedScore, setEvaluatedScore] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const rewardedItems = useRef(new Set<string>());

  const currentItem = DICTATION_BANK[currentIndex];

  useEffect(() => {
    setTypedInput('');
    setEvaluatedScore(null);
    setShowHint(false);
  }, [currentIndex]);

  const handlePlayAudio = () => {
    arabicAudio.speak(currentItem.arabic, { rate: audioSpeed });
  };

  const handleEvaluate = () => {
    if (!normalizeArabicText(typedInput)) return;
    const score = calculateArabicMatchScore(currentItem.arabic, typedInput);
    setEvaluatedScore(score);

    if (score >= 80) {
      arabicAudio.playChime('celebrate');
      if (!rewardedItems.current.has(currentItem.id)) {
        rewardedItems.current.add(currentItem.id);
        onAddXp(25);
      }
      confetti({ particleCount: 70, spread: 60 });
    } else {
      arabicAudio.playChime('correct');
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DICTATION_BANK.length);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-800/80 text-rose-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5" /> Listening & Orthography Drills
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Audio Dictation Studio (الإِمْلاَءُ المَسْمُوعُ)
          </h2>
          <p className="text-rose-100/90 text-sm leading-relaxed">
            Train your ear and typing speed. Listen to native Arabic pronunciation at variable playback speeds and type the sentence accurately.
          </p>
        </div>
      </div>

      {/* Dictation Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
        {/* Progress & Speed Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dictation {currentIndex + 1} of {DICTATION_BANK.length}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 rounded-full uppercase">
              {currentItem.level}
            </span>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <span className="text-slate-400 px-2">Speed:</span>
            {[
              { rate: 0.65, label: '0.7x (Slow)' },
              { rate: 0.85, label: '0.9x (Normal)' },
              { rate: 1.05, label: '1.1x (Fast)' },
            ].map((s) => (
              <button
                key={s.rate}
                type="button"
                onClick={() => setAudioSpeed(s.rate)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  audioSpeed === s.rate
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Trigger Player */}
        <div className="p-8 bg-rose-50/70 dark:bg-rose-950/30 rounded-3xl border border-rose-200 dark:border-rose-900/40 text-center space-y-4">
          <button
            type="button"
            onClick={handlePlayAudio}
            className="w-20 h-20 rounded-full mx-auto bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 transition transform active:scale-95 group"
          >
            <Volume2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
          <p className="text-xs font-bold text-rose-900 dark:text-rose-200">
            Click to Listen to the Audio Clip
          </p>
        </div>

        {/* Text Input Area */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Type what you hear:
          </label>
          <textarea
            rows={2}
            dir="rtl"
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            placeholder="اكتب هنا ما تسمعه..."
            className="w-full p-4 font-arabic text-2xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
        </div>

        {/* Evaluation Score Banner */}
        {evaluatedScore !== null && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Orthographic Accuracy:
              </span>
              <span
                className={`text-sm font-extrabold px-3 py-1 rounded-full ${
                  evaluatedScore >= 80
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {evaluatedScore}% Match
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <p className="text-slate-500">Correct Target:</p>
              <p className="font-arabic text-xl font-bold text-slate-900 dark:text-white" dir="rtl">
                {currentItem.arabic}
              </p>
              <p className="text-slate-400 italic">"{currentItem.english}"</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            {showHint ? `Translation: "${currentItem.english}"` : 'Need a hint?'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEvaluate}
              disabled={!typedInput.trim()}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              Verify Dictation
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
            >
              Next ➔
            </button>
          </div>
        </div>

        {/* Virtual Keyboard */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <VirtualKeyboard
            onInsertChar={(char) => setTypedInput((prev) => prev + char)}
            onBackspace={() => setTypedInput((prev) => prev.slice(0, -1))}
            onClear={() => setTypedInput('')}
            onEnter={handleEvaluate}
          />
        </div>
      </div>
    </div>
  );
};
