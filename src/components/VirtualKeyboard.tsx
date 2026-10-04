import React, { useState } from 'react';
import { Delete, Space, CornerDownLeft, Keyboard } from 'lucide-react';
import { arabicAudio } from '../utils/audio';
import { ARABIC_KEY_ROWS, TASHKEEL_KEYS } from '../utils/arabicKeyboard';

interface VirtualKeyboardProps {
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onEnter?: () => void;
  onClear?: () => void;
  mappingEnabled?: boolean;
  onToggleMapping?: () => void;
  pressedKey?: string | null;
  shiftPressed?: boolean;
  className?: string;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onInsertChar, onBackspace, onEnter, onClear,
  mappingEnabled = true, onToggleMapping, pressedKey = null, shiftPressed = false, className = '',
}) => {
  const [showTashkeel, setShowTashkeel] = useState(true);
  const insert = (char: string) => { arabicAudio.playChime('click'); onInsertChar(char); };
  const active = (code: string) => pressedKey === code ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100';
  return <div onMouseDown={event => event.preventDefault()} className={`min-w-0 p-4 bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800 ${className}`}>
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
      <span className="font-semibold text-slate-200">Arabic Virtual Keyboard (لوحة المفاتيح)</span>
      <div className="flex flex-wrap items-center gap-2">
        {onToggleMapping && <button type="button" aria-pressed={mappingEnabled} onClick={onToggleMapping} className={`px-2.5 py-1 rounded-lg font-medium ${mappingEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}><Keyboard size={14} className="inline mr-1" />Computer mapping: {mappingEnabled ? 'On' : 'Off'}</button>}
        <button type="button" aria-pressed={showTashkeel} onClick={() => setShowTashkeel(!showTashkeel)} className={`px-2.5 py-1 rounded-lg font-medium ${showTashkeel ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{showTashkeel ? 'Tashkeel ON (التشكيل)' : 'Tashkeel OFF'}</button>
        {onClear && <button type="button" onClick={onClear} className="px-2.5 py-1 bg-rose-950/60 text-rose-300 border border-rose-800/40 rounded-lg hover:bg-rose-900/80">Clear All</button>}
      </div>
    </div>
    <p className="text-xs text-slate-400 mb-3">{mappingEnabled ? 'Focus the answer box and type using the English keys below. Hold Shift for vowels and alternate letters.' : 'Computer mapping is off. Type with your usual keyboard, or click the Arabic keys.'}{onEnter && ' Enter checks your answer; Shift + Enter adds a new line.'}</p>
    {showTashkeel && <div className="flex flex-wrap items-center justify-center gap-2 mb-3 p-2 bg-slate-950/60 rounded-xl border border-slate-800/70">
      {TASHKEEL_KEYS.map(item => <button key={item.name} type="button" onClick={() => insert(item.char)} aria-label={`${item.name}: ${item.shortcut}`} title={`${item.name} (${item.shortcut})`} className={`min-w-12 px-2 h-14 rounded-lg border flex flex-col items-center justify-center ${shiftPressed && pressedKey === item.code ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-emerald-950/40 hover:bg-emerald-800/80 text-emerald-300 border-emerald-800/40'}`}><span className="font-arabic text-xl" lang="ar">{item.char}</span><span className="text-[9px] text-slate-300">{item.shortcut}</span></button>)}
    </div>}
    {/* Match the left-to-right positions of a physical QWERTY keyboard. Scroll within the pad on small screens. */}
    <div className="overflow-x-auto pb-1">
      <div className="space-y-2 select-none min-w-[600px]" dir="ltr">
        {ARABIC_KEY_ROWS.map((row, index) => <div key={index} className={`flex items-center justify-center gap-1.5 ${index ? 'px-3' : ''}`}>
          {row.map(key => <button key={key.code} type="button" onClick={() => insert(shiftPressed ? key.shifted : key.arabic)} aria-label={`${key.arabic} (${key.label})`} title={`${key.label}: ${key.arabic} · Shift + ${key.label}: ${key.shifted}`} className={`flex-1 min-w-9 h-14 rounded-lg border flex flex-col items-center justify-center transition active:scale-95 ${active(key.code)}`}><span className="font-arabic text-xl font-bold" dir="rtl" lang="ar">{shiftPressed ? key.shifted : key.arabic}</span><span className="text-[10px] font-sans text-slate-400">{key.label}</span></button>)}
          {index === 2 && <button type="button" onClick={onBackspace} aria-label="Backspace" title="Backspace" className={`px-3 h-14 rounded-lg border ${active('Backspace')}`}><Delete size={20} /></button>}
        </div>)}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button type="button" onClick={() => insert(' ')} className={`flex-1 h-11 rounded-lg border font-medium flex items-center justify-center gap-2 ${active('Space')}`}><Space size={16} /><span className="text-xs">مسافة (Space)</span></button>
          {onEnter && <button type="button" onClick={onEnter} title="Enter" className="px-6 h-11 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2"><CornerDownLeft size={16} /><span className="text-xs">Check / Submit ↵</span></button>}
        </div>
      </div>
    </div>
  </div>;
};
