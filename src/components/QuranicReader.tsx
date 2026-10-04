import React, { useState } from 'react';
import { BookOpen, Sparkles, Volume2, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import { QURANIC_TEXTS, QuranicText, QuranicVerse, QuranicWordToken } from '../data/quranicData';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';

interface QuranicReaderProps {
  onAddXp: (amount: number) => void;
}

export const QuranicReader: React.FC<QuranicReaderProps> = ({ onAddXp }) => {
  const [selectedText, setSelectedText] = useState<QuranicText>(QURANIC_TEXTS[0]);
  const [selectedWord, setSelectedWord] = useState<QuranicWordToken | null>(null);
  const [activeAyah, setActiveAyah] = useState<number | null>(null);

  const handleWordClick = (word: QuranicWordToken) => {
    arabicAudio.playChime('click');
    setSelectedWord(word);
    arabicAudio.speak(word.arabic);
  };

  const handlePlayAyah = (verse: QuranicVerse) => {
    setActiveAyah(verse.ayahNumber);
    arabicAudio.speak(verse.arabic, {
      onEnd: () => setActiveAyah(null),
    });
  };

  const handlePlayEntireSurah = async () => {
    for (let i = 0; i < selectedText.verses.length; i++) {
      const v = selectedText.verses[i];
      setActiveAyah(v.ayahNumber);
      await new Promise<void>((resolve) => {
        arabicAudio.speak(v.arabic, {
          onEnd: () => setTimeout(resolve, 500),
        });
      });
    }
    setActiveAyah(null);
    onAddXp(30);
    arabicAudio.playChime('celebrate');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Chapter / Text Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {QURANIC_TEXTS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              arabicAudio.playChime('click');
              setSelectedText(t);
              setSelectedWord(null);
            }}
            className={`p-3.5 rounded-2xl text-left border transition shrink-0 min-w-[220px] ${
              selectedText.id === t.id
                ? 'bg-emerald-700 text-white border-emerald-600 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                selectedText.id === t.id ? 'bg-emerald-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}>
                {t.category === 'quran' ? 'Qur’anic Text' : 'Classical Poetry'}
              </span>
              <span className="text-xs opacity-75">{t.totalVerses} Verses</span>
            </div>
            <h4 className="font-bold text-sm leading-tight">{t.titleEn}</h4>
            <p className="font-arabic text-base font-bold opacity-90 mt-0.5" dir="rtl">
              {t.titleAr}
            </p>
          </button>
        ))}
      </div>

      {/* Main Reader View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Verses Reader (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-arabic text-3xl font-bold text-slate-900 dark:text-white" dir="rtl">
                  {selectedText.titleAr}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedText.titleEn} • {selectedText.authorOrSource}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayEntireSurah}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" /> Recite Entire Text
                </button>
              </div>
            </div>

            {/* Part of Speech Legend */}
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
              <span>Grammar Legend:</span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Noun (اسم)
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Verb (فعل)
              </span>
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Particle (حرف)
              </span>
            </div>

            {/* Verses List */}
            <div className="space-y-6">
              {selectedText.verses.map((v) => {
                const isActive = activeAyah === v.ayahNumber;

                return (
                  <div
                    key={v.ayahNumber}
                    className={`p-5 rounded-2xl border transition duration-200 space-y-3 ${
                      isActive
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/40'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300'
                    }`}
                  >
                    {/* Verse Number & Arabic Tokens */}
                    <div
                      className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-right"
                      dir="rtl"
                    >
                      {v.words.map((w, wIdx) => {
                        const posColor =
                          w.partOfSpeech === 'noun'
                            ? 'text-blue-800 dark:text-blue-300 hover:bg-blue-100/60'
                            : w.partOfSpeech === 'verb'
                            ? 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100/60'
                            : 'text-amber-800 dark:text-amber-300 hover:bg-amber-100/60';

                        return (
                          <button
                            key={wIdx}
                            type="button"
                            onClick={() => handleWordClick(w)}
                            className={`font-arabic text-3xl font-bold px-1.5 py-0.5 rounded-lg transition-all active:scale-95 ${posColor}`}
                            title={`Click for root & translation`}
                          >
                            {w.arabic}
                          </button>
                        );
                      })}

                      {/* Ayah End Symbol */}
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-emerald-600 font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 mx-2">
                        {v.ayahNumber}
                      </span>
                    </div>

                    {/* Translation & Audio */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                      <p className="text-slate-600 dark:text-slate-300 italic">
                        "{v.english}"
                      </p>
                      <button
                        type="button"
                        onClick={() => handlePlayAyah(v)}
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-950 rounded-lg"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Play Verse
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Morphological Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Word Morphology Inspector
            </h4>

            {selectedWord ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                  <span className="font-arabic text-5xl font-bold text-emerald-800 dark:text-emerald-300 block">
                    {selectedWord.arabic}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                    {selectedWord.transliteration}
                  </span>
                  <AudioPlayerButton text={selectedWord.arabic} variant="primary" size="sm" label="Listen" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400">Meaning:</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedWord.english}</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400">Grammatical Class:</span>
                    <span className="capitalize font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedWord.partOfSpeech}
                    </span>
                  </div>

                  {selectedWord.root && (
                    <div className="p-3 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 rounded-xl flex items-center justify-between">
                      <span className="text-violet-800 dark:text-violet-300 font-medium">3-Letter Root:</span>
                      <strong className="font-arabic text-xl text-violet-900 dark:text-violet-200 font-bold" dir="rtl">
                        {selectedWord.root}
                      </strong>
                    </div>
                  )}

                  {selectedWord.grammarDetail && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-blue-900 dark:text-blue-200">
                      <strong>Tafsir & Syntax: </strong>
                      {selectedWord.grammarDetail}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                <BookOpen className="w-8 h-8 mx-auto opacity-30 text-emerald-600" />
                <p>Click any token in the verses to view its 3-letter root, grammatical classification, and exact literal translation!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
