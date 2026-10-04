// Preserve vowel marks: بَ and بُ must use different recordings.
export function normalizeAudioText(text: string): string {
  return text.normalize('NFC').replace(/\s+/g, ' ').trim();
}
