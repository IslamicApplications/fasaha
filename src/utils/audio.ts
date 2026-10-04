// Arabic speech synthesis and audio utilities

class ArabicAudioService {
  private synth: SpeechSynthesis | null = null;
  private arabicVoice: SpeechSynthesisVoice | null = null;
  private isVoiceInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize high-quality Arabic voices
    this.arabicVoice = 
      voices.find(v => v.lang.startsWith('ar-SA') || v.lang === 'ar_SA') ||
      voices.find(v => v.lang.startsWith('ar-EG') || v.lang === 'ar_EG') ||
      voices.find(v => v.lang.startsWith('ar') || v.lang.includes('Arabic')) ||
      null;
    this.isVoiceInitialized = true;
  }

  public speak(text: string, options: { rate?: number; pitch?: number; onEnd?: () => void } = {}): void {
    if (!this.synth) {
      this.playHarmonicFallback();
      if (options.onEnd) setTimeout(options.onEnd, 600);
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    if (!this.isVoiceInitialized) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.arabicVoice ? this.arabicVoice.lang : 'ar-SA';
    if (this.arabicVoice) {
      utterance.voice = this.arabicVoice;
    }
    utterance.rate = options.rate ?? 0.85; // Slightly slower for language learners
    utterance.pitch = options.pitch ?? 1.0;

    if (options.onEnd) {
      utterance.onend = options.onEnd;
      utterance.onerror = options.onEnd;
    }

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error, falling back:', e);
      this.playHarmonicFallback();
      if (options.onEnd) options.onEnd();
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Soft melodic chime for feedback or fallback
  public playChime(type: 'success' | 'click' | 'correct' | 'wrong' | 'celebrate'): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'correct' || type === 'success') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });
      } else if (type === 'wrong') {
        [320, 240].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.2);
        });
      } else if (type === 'celebrate') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
        });
      }
    } catch {
      // AudioContext not allowed or unsupported
    }
  }

  // Ambient Maqam Soundscape Generator
  private ambientCtx: AudioContext | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  public isAmbientPlaying = false;

  public toggleAmbientSoundscape(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbientSoundscape();
      return false;
    } else {
      this.startAmbientSoundscape();
      return true;
    }
  }

  public startAmbientSoundscape(): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ambientCtx = new AudioCtx();
      this.ambientGain = this.ambientCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.01, this.ambientCtx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, this.ambientCtx.currentTime + 2);
      this.ambientGain.connect(this.ambientCtx.destination);

      // Maqam Bayati / Hijaz Root Harmonics (D - F# - A - D - G)
      const freqs = [146.83, 220.00, 293.66, 370.00, 440.00];
      this.ambientOscs = freqs.map((f) => {
        const osc = this.ambientCtx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ambientCtx!.currentTime);
        osc.connect(this.ambientGain!);
        osc.start();
        return osc;
      });
      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public stopAmbientSoundscape(): void {
    if (this.ambientGain && this.ambientCtx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ambientCtx.currentTime + 1);
        setTimeout(() => {
          this.ambientOscs.forEach(o => o.stop());
          this.ambientOscs = [];
          if (this.ambientCtx && this.ambientCtx.state !== 'closed') {
            this.ambientCtx.close();
          }
          this.ambientCtx = null;
        }, 1100);
      } catch {
        // cleanup
      }
    }
    this.isAmbientPlaying = false;
  }

  private playHarmonicFallback(): void {
    this.playChime('click');
  }
}

export const arabicAudio = new ArabicAudioService();

// Speech Recognition helper for Arabic with robust permission and error handling
export async function createArabicSpeechRecognizer(
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (friendlyMessage: string) => void,
  onEnd: () => void,
  lang: string = 'ar-SA'
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRec) {
    onError('Speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.');
    return null;
  }

  // Pre-request microphone access so browser doesn't block SpeechRec
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Keep track of stream to release when done
      setTimeout(() => {
        stream.getTracks().forEach(t => t.stop());
      }, 500);
    }
  } catch (e: any) {
    if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
      onError('Microphone permission was denied. Please allow microphone access in your browser address bar.');
      return null;
    }
  }

  const recognition = new SpeechRec();
  recognition.lang = lang;
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 3;

  let hasReceivedSpeech = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    hasReceivedSpeech = true;
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += transcript;
      } else {
        interim += transcript;
      }
    }

    if (final) {
      onResult(final.trim(), true);
    } else if (interim) {
      onResult(interim.trim(), false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    const err = event.error;
    if (err === 'no-speech' || err === 'aborted') {
      // Natural pause between words or idle listening - do not surface error
      return;
    }
    if (err === 'not-allowed') {
      onError('Microphone permission denied. Click the camera/microphone icon in your browser URL bar to allow.');
      return;
    }
    if (err === 'network') {
      // Cloud speech server unavailable - fallback gracefully
      onError('Speech server busy. You can record your voice below for direct acoustic evaluation and playback.');
      return;
    }
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
}

// Calculate Arabic string similarity (normalized to ignore harakat for matching)
export function normalizeArabicText(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

export function calculateArabicMatchScore(target: string, spoken: string): number {
  const normTarget = normalizeArabicText(target).toLowerCase();
  const normSpoken = normalizeArabicText(spoken).toLowerCase();

  if (normTarget === normSpoken) return 100;
  if (normSpoken.includes(normTarget) || normTarget.includes(normSpoken)) return 85;

  // Levenshtein distance
  const m = normTarget.length;
  const n = normSpoken.length;
  if (m === 0) return n === 0 ? 100 : 0;
  if (n === 0) return 0;

  const matrix: number[][] = [];
  for (let i = 0; i <= m; i++) matrix[i] = [i];
  for (let j = 0; j <= n; j++) matrix[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = normTarget[i - 1] === normSpoken[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[m][n];
  const maxLen = Math.max(m, n);
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
  return similarity;
}
