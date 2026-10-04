// Arabic 101: https://learn.microsoft.com/en-us/msdn-files/resources/msdn/goglobal/keyboards/kbda1.html
export interface ArabicKey {
  code: string;
  label: string;
  arabic: string;
  shifted: string;
}
export const ARABIC_KEY_ROWS: ArabicKey[][] = [
  [
    ['Backquote', '`', 'ذ', 'ّ'], ['KeyQ', 'Q', 'ض', 'َ'], ['KeyW', 'W', 'ص', 'ً'],
    ['KeyE', 'E', 'ث', 'ُ'], ['KeyR', 'R', 'ق', 'ٌ'], ['KeyT', 'T', 'ف', 'لإ'],
    ['KeyY', 'Y', 'غ', 'إ'], ['KeyU', 'U', 'ع', '‘'], ['KeyI', 'I', 'ه', '÷'],
    ['KeyO', 'O', 'خ', '×'], ['KeyP', 'P', 'ح', '؛'], ['BracketLeft', '[', 'ج', '<'],
    ['BracketRight', ']', 'د', '>'], ['Backslash', '\\', '\\', '|'],
  ],
  [
    ['KeyA', 'A', 'ش', 'ِ'], ['KeyS', 'S', 'س', 'ٍ'], ['KeyD', 'D', 'ي', ']'],
    ['KeyF', 'F', 'ب', '['], ['KeyG', 'G', 'ل', 'لأ'], ['KeyH', 'H', 'ا', 'أ'],
    ['KeyJ', 'J', 'ت', 'ـ'], ['KeyK', 'K', 'ن', '،'], ['KeyL', 'L', 'م', '/'],
    ['Semicolon', ';', 'ك', ':'], ['Quote', "'", 'ط', '"'],
  ],
  [
    ['KeyZ', 'Z', 'ئ', '~'], ['KeyX', 'X', 'ء', 'ْ'], ['KeyC', 'C', 'ؤ', '}'],
    ['KeyV', 'V', 'ر', '{'], ['KeyB', 'B', 'لا', 'لآ'], ['KeyN', 'N', 'ى', 'آ'],
    ['KeyM', 'M', 'ة', '’'], ['Comma', ',', 'و', ','], ['Period', '.', 'ز', '.'],
    ['Slash', '/', 'ظ', '؟'],
  ],
].map(row => row.map(([code, label, arabic, shifted]) => ({ code, label, arabic, shifted })));

export const TASHKEEL_KEYS = [
  { char: 'َ', name: 'Fatha', shortcut: 'Shift + Q', code: 'KeyQ' },
  { char: 'ُ', name: 'Damma', shortcut: 'Shift + E', code: 'KeyE' },
  { char: 'ِ', name: 'Kasra', shortcut: 'Shift + A', code: 'KeyA' },
  { char: 'ْ', name: 'Sukun', shortcut: 'Shift + X', code: 'KeyX' },
  { char: 'ّ', name: 'Shaddah', shortcut: 'Shift + `', code: 'Backquote' },
  { char: 'ً', name: 'Tanwin Fath', shortcut: 'Shift + W', code: 'KeyW' },
  { char: 'ٌ', name: 'Tanwin Damm', shortcut: 'Shift + R', code: 'KeyR' },
  { char: 'ٍ', name: 'Tanwin Kasr', shortcut: 'Shift + S', code: 'KeyS' },
  { char: 'ـ', name: 'Tatweel', shortcut: 'Shift + J', code: 'KeyJ' },
  { char: '،', name: 'Comma', shortcut: 'Shift + K', code: 'KeyK' },
  { char: '؟', name: 'Question', shortcut: 'Shift + /', code: 'Slash' },
];

interface PhysicalKey {
  code: string;
  key: string;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  isComposing?: boolean;
}
export function mapPhysicalKey(event: PhysicalKey): string | null {
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return null;
  // Native Arabic input and IME composition already produce the desired text.
  if (!/^[\x20-\x7E]$/.test(event.key)) return null;
  if (event.code === 'Space') return ' ';
  const key = ARABIC_KEY_ROWS.flat().find(key => key.code === event.code);
  return key ? (event.shiftKey ? key.shifted : key.arabic) : null;
}

export function editAtSelection(value: string, start: number, end: number, insert: string | null) {
  start = Math.max(0, Math.min(start, value.length));
  end = Math.max(start, Math.min(end, value.length));
  if (insert === null && start === end && start > 0) {
    // Backspace removes a Unicode code point, including a single vowel mark.
    const points = Array.from(value.slice(0, start));
    start -= points[points.length - 1].length;
  }
  const text = insert ?? '';
  return { value: value.slice(0, start) + text + value.slice(end), caret: start + text.length };
}
