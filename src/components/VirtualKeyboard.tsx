import React, { useState } from 'react';
import { Delete, Space, CornerDownLeft } from 'lucide-react';
import { arabicAudio } from '../utils/audio';

interface VirtualKeyboardProps {
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onEnter?: () => void;
  onClear?: () => void;
  className?: string;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onInsertChar,
  onBackspace,
  onEnter,
  onClear,
  className = '',
}) => {
  const [showTashkeel, setShowTashkeel] = useState(true);

  // Standard Arabic Keyboard Layout rows
  const row1 = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', 'ذ'];
  const row2 = ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'];
  const row3 = ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];
  const tashkeelRow = [
    { char: 'َ', name: 'Fatha' },
    { char: 'ُ', name: 'Damma' },
    { char: 'ِ', name: 'Kasra' },
    { char: 'ْ', name: 'Sukun' },
    { char: 'ّ', name: 'Shaddah' },
    { char: 'ً', name: 'Tanwin Fatḥ' },
    { char: 'ٌ', name: 'Tanwin Damm' },
    { char: 'ٍ', name: 'Tanwin Kasr' },
    { char: 'ـ', name: 'Tatweel' },
    { char: '،', name: 'Comma' },
    { char: '؟', name: 'Question' }
  ];

  const handleCharClick = (char: string) => {
    arabicAudio.playChime('click');
    onInsertChar(char);
  };

  return (
    <div className={`p-4 bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800 ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200">Arabic Virtual Keyboard (لوحة المفاتيح)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTashkeel(!showTashkeel)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              showTashkeel ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {showTashkeel ? 'Tashkeel ON (التشكيل)' : 'Tashkeel OFF'}
          </button>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="px-2.5 py-1 bg-rose-950/60 text-rose-300 border border-rose-800/40 rounded-lg hover:bg-rose-900/80 transition"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Tashkeel Row */}
      {showTashkeel && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 p-2 bg-slate-950/60 rounded-xl border border-slate-800/70" dir="rtl">
          {tashkeelRow.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCharClick(item.char)}
              title={item.name}
              className="w-9 h-9 rounded-lg bg-emerald-950/40 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-800/40 font-arabic text-xl font-bold flex items-center justify-center transition active:scale-90"
            >
              {item.char}
            </button>
          ))}
        </div>
      )}

      {/* Main Keys Rows */}
      <div className="space-y-2 select-none" dir="rtl">
        {/* Row 1 */}
        <div className="flex items-center justify-center gap-1.5">
          {row1.map((char, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCharClick(char)}
              className="flex-1 min-w-[2.2rem] h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-arabic text-xl font-bold flex items-center justify-center transition active:scale-95 shadow-sm hover:border-emerald-500/50 border border-slate-700/50"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-center gap-1.5 px-3">
          {row2.map((char, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCharClick(char)}
              className="flex-1 min-w-[2.2rem] h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-arabic text-xl font-bold flex items-center justify-center transition active:scale-95 shadow-sm hover:border-emerald-500/50 border border-slate-700/50"
            >
              {char}
            </button>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-center gap-1.5 px-6">
          {row3.map((char, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCharClick(char)}
              className="flex-1 min-w-[2.2rem] h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-arabic text-xl font-bold flex items-center justify-center transition active:scale-95 shadow-sm hover:border-emerald-500/50 border border-slate-700/50"
            >
              {char}
            </button>
          ))}
          <button
            type="button"
            onClick={onBackspace}
            title="Backspace"
            className="px-3.5 h-11 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/40 flex items-center justify-center transition active:scale-95"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Bar: Space & Enter */}
        <div className="flex items-center justify-center gap-2 pt-1" dir="ltr">
          <button
            type="button"
            onClick={() => handleCharClick(' ')}
            className="flex-1 h-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-2 transition active:scale-98 border border-slate-700 shadow-sm"
          >
            <Space className="w-4 h-4 text-slate-400" />
            <span className="text-xs">مسافة (Space)</span>
          </button>
          {onEnter && (
            <button
              type="button"
              onClick={onEnter}
              className="px-6 h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-emerald-950/40"
            >
              <CornerDownLeft className="w-4 h-4" />
              <span className="text-xs">Check / Submit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
