import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { editAtSelection, mapPhysicalKey } from '../utils/arabicKeyboard';

export function useArabicKeyboard(value: string, onChange: (value: string) => void, onEnter?: () => void) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pendingCaret = useRef<number | null>(null);
  const [mappingEnabled, setMappingEnabled] = useState(true);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [shiftPressed, setShiftPressed] = useState(false);

  useLayoutEffect(() => {
    if (pendingCaret.current !== null && inputRef.current) {
      inputRef.current.setSelectionRange(pendingCaret.current, pendingCaret.current);
      pendingCaret.current = null;
    }
  }, [value]);

  function edit(insert: string | null) {
    const input = inputRef.current;
    const current = input?.value ?? value;
    const result = editAtSelection(current, input?.selectionStart ?? current.length, input?.selectionEnd ?? current.length, insert);
    pendingCaret.current = result.caret;
    onChange(result.value);
    input?.focus();
    if (result.value === current) {
      input?.setSelectionRange(result.caret, result.caret);
      pendingCaret.current = null;
    }
  }
  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
    setPressedKey(event.code);
    setShiftPressed(event.shiftKey);
    if (event.key === 'Enter' && !event.shiftKey && onEnter) {
      event.preventDefault();
      if (!event.repeat) onEnter();
      return;
    }
    if (!mappingEnabled) return;
    const character = mapPhysicalKey(event);
    if (character !== null) {
      event.preventDefault();
      edit(character);
    }
  }
  function onKeyUp(event: KeyboardEvent<HTMLTextAreaElement>) {
    setPressedKey(current => current === event.code ? null : current);
    setShiftPressed(event.shiftKey);
  }
  function onBlur() { setPressedKey(null); setShiftPressed(false); }
  function clear() {
    pendingCaret.current = 0;
    onChange('');
    inputRef.current?.focus();
  }
  return {
    inputProps: { ref: inputRef, onKeyDown, onKeyUp, onBlur },
    keyboardProps: {
      onInsertChar: (char: string) => edit(char), onBackspace: () => edit(null), onClear: clear, onEnter,
      mappingEnabled, onToggleMapping: () => setMappingEnabled(enabled => !enabled), pressedKey, shiftPressed,
    },
  };
}
