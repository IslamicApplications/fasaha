import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';
import { ALPHABET_DATA, NON_CONNECTING_LETTERS } from '../data/alphabetData';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';

export const ScriptConnectorLab: React.FC = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>(['ك', 'ت', 'ا', 'ب']);
  const [wordMeaning, setWordMeaning] = useState('Book (Kitāb)');

  const presetWords = [
    { letters: ['ك', 'ت', 'ا', 'ب'], arabic: 'كِتَابٌ', meaning: 'Book (Kitāb)' },
    { letters: ['ب', 'ي', 'ت'], arabic: 'بَيْتٌ', meaning: 'House (Bayt)' },
    { letters: ['ق', 'ل', 'م'], arabic: 'قَلَمٌ', meaning: 'Pen (Qalam)' },
    { letters: ['م', 'س', 'ج', 'د'], arabic: 'مَسْجِدٌ', meaning: 'Mosque (Masjid)' },
    { letters: ['س', 'ل', 'ا', 'م'], arabic: 'سَلاَمٌ', meaning: 'Peace (Salām)' },
    { letters: ['ش', 'م', 'س'], arabic: 'شَمْسٌ', meaning: 'Sun (Shams)' },
    { letters: ['م', 'د', 'ر', 'س', 'ة'], arabic: 'مَدْرَسَةٌ', meaning: 'School (Madrasah)' },
  ];

  const connectedWord = selectedLetters.join('');

  // Determine positional forms for each letter in the current sequence
  const analyzedLetters = selectedLetters.map((char, index) => {
    const isFirst = index === 0;
    const isLast = index === selectedLetters.length - 1;
    const prevChar = index > 0 ? selectedLetters[index - 1] : null;
    const prevIsNonConnector = prevChar ? NON_CONNECTING_LETTERS.includes(prevChar) : true;
    const isNonConnector = NON_CONNECTING_LETTERS.includes(char);

    const letterMeta = ALPHABET_DATA.find((l) => l.letter === char || l.forms.isolated === char);

    let position: 'isolated' | 'initial' | 'medial' | 'final' = 'isolated';

    if (selectedLetters.length === 1) {
      position = 'isolated';
    } else if (isFirst) {
      position = 'initial';
    } else if (isLast) {
      position = prevIsNonConnector ? 'isolated' : 'final';
    } else {
      position = prevIsNonConnector ? 'initial' : 'medial';
    }

    const formShape = letterMeta ? letterMeta.forms[position] : char;

    return {
      char,
      position,
      isNonConnector,
      prevIsNonConnector,
      formShape,
      meta: letterMeta,
    };
  });

  const handleAddLetter = (char: string) => {
    if (selectedLetters.length >= 7) return;
    arabicAudio.playChime('click');
    setSelectedLetters([...selectedLetters, char]);
    setWordMeaning('Custom sequence');
  };

  const handleRemoveLetter = (index: number) => {
    arabicAudio.playChime('click');
    const updated = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(updated);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Script Laboratory
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            How Arabic Letters Connect (وَصْلُ الحُرُوفِ)
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Arabic script is written in flowing cursive from right to left. Click letters to see them transform in real-time.
          </p>
        </div>

        {/* Audio speaker for whole word */}
        {connectedWord && (
          <div className="flex items-center gap-2">
            <AudioPlayerButton
              text={connectedWord}
              label="Pronounce Connected Word"
              variant="primary"
              size="md"
            />
          </div>
        )}
      </div>

      {/* Preset selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-medium text-slate-500 shrink-0">Try Presets:</span>
        {presetWords.map((pw, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              arabicAudio.playChime('click');
              setSelectedLetters(pw.letters);
              setWordMeaning(pw.meaning);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition shrink-0 flex items-center gap-1.5 ${
              connectedWord === pw.letters.join('')
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="font-arabic text-sm font-bold">{pw.arabic}</span>
            <span className="opacity-80">({pw.meaning})</span>
          </button>
        ))}
      </div>

      {/* Main Connection Visualizer */}
      <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-slate-950 dark:to-emerald-950/20 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 text-center space-y-6">
        {/* The Final Connected Word Result */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Connected Cursive Output
          </span>
          <div
            className="font-arabic text-6xl md:text-7xl font-bold text-slate-900 dark:text-white my-3 tracking-normal"
            dir="rtl"
          >
            {connectedWord || '...'}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {wordMeaning}
          </p>
        </div>

        {/* Step-by-step Connection Anatomy */}
        <div className="pt-4 border-t border-emerald-200/60 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Anatomy Breakdown (Right to Left)
          </h4>

          <div
            className="flex flex-row-reverse items-center justify-center gap-3 md:gap-4 flex-wrap"
            dir="ltr"
          >
            {analyzedLetters.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-800 p-3 md:p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center min-w-[5.5rem] group hover:border-emerald-500 transition"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveLetter(idx)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                  title="Remove letter"
                >
                  ✕
                </button>

                {/* Letter Shape in this position */}
                <span className="font-arabic text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  {item.formShape}
                </span>

                {/* Position Badge */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-1 ${
                    item.position === 'initial'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : item.position === 'medial'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      : item.position === 'final'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.position}
                </span>

                {/* Name */}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.meta?.nameEn || item.char}
                </span>

                {/* Non-connector warning badge */}
                {item.isNonConnector && (
                  <span className="mt-1 text-[9px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                    Non-Connector
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Non-Connecting Letters Rule Card */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <p className="font-bold text-amber-950 dark:text-amber-100">
            The 6 Friendly Non-Connecting Letters (الحروف الرافسة):
          </p>
          <p>
            The letters <strong>( د ، ذ ، ر ، ز ، و ، ا )</strong> connect to preceding letters on the right, but <em>NEVER</em> connect to any letter that follows them on the left!
            The next letter must begin as an Initial or Isolated form.
          </p>
        </div>
      </div>

      {/* Quick letter palette to add */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Click to Add a Letter:
        </h4>
        <div className="flex flex-wrap gap-1.5" dir="rtl">
          {ALPHABET_DATA.slice(0, 28).map((letter) => (
            <button
              key={letter.id}
              type="button"
              onClick={() => handleAddLetter(letter.letter)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-emerald-950 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 font-arabic text-xl font-bold flex items-center justify-center transition active:scale-90 border border-slate-200 dark:border-slate-700"
            >
              {letter.letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
