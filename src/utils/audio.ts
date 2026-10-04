import { normalizeAudioText } from './audioText';

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onCancel?: () => void;
}

// Local lesson recordings with browser speech as a fallback.

export class ArabicAudioService {
  private synth: SpeechSynthesis | null = null;
  private arabicVoice: SpeechSynthesisVoice | null = null;
  private isVoiceInitialized = false;

  private recordings: Record<string, string> = {};
  private audioBase = './';
  private recording: HTMLAudioElement | null = null;
  private playbackId = 0;
  private cancelPlayback: (() => void) | undefined;
  private fallbackTimer: ReturnType<typeof setTimeout> | undefined;

  public setRecordings(recordings: Record<string, string>, baseUrl = './'): void {
    this.recordings = recordings;
    this.audioBase = baseUrl;
  }

  public hasRecording(text: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.recordings, normalizeAudioText(text));
  }

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
    if (!voices || voices.length === 0) return;

    // Filter Arabic voices
    const arabicVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('ar') ||
        v.lang.toLowerCase().includes('arabic') ||
        v.name.toLowerCase().includes('arabic')
    );

    if (arabicVoices.length === 0) {
      this.isVoiceInitialized = true;
      return;
    }

    // Rank voices to find the highest-fidelity natural/neural voice
    const rankedVoices = [...arabicVoices].sort((a, b) => {
      const getScore = (voice: SpeechSynthesisVoice): number => {
        const name = (voice.name || '').toLowerCase();
        const lang = (voice.lang || '').toLowerCase();
        let score = 0;

        // Neural / Natural / Premium / Enhanced voices (Highest fidelity)
        if (name.includes('natural') || name.includes('neural')) score += 200;
        if (name.includes('premium') || name.includes('enhanced')) score += 150;
        if (name.includes('online') || name.includes('cloud')) score += 100;
        if (name.includes('siri') || name.includes('google') || name.includes('microsoft')) score += 80;

        // Standard Dialect preference
        if (lang.startsWith('ar-sa') || lang === 'ar_sa') score += 50;
        if (lang.startsWith('ar-eg') || lang === 'ar-ae' || lang === 'ar-jo') score += 40;

        // Favor non-local / high-definition web voices
        if (!voice.localService) score += 30;

        return score;
      };

      return getScore(b) - getScore(a);
    });

    this.arabicVoice = rankedVoices[0];
    this.isVoiceInitialized = true;
  }

  public getAvailableArabicVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    return voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('ar') ||
        v.lang.toLowerCase().includes('arabic') ||
        v.name.toLowerCase().includes('arabic')
    );
  }

  public getCurrentVoice(): SpeechSynthesisVoice | null {
    if (!this.isVoiceInitialized) this.initVoices();
    return this.arabicVoice;
  }

  public setVoiceByName(voiceName: string): boolean {
    if (!this.synth) return false;
    const voices = this.synth.getVoices();
    const found = voices.find((v) => v.name === voiceName);
    if (found) {
      this.arabicVoice = found;
      return true;
    }
    return false;
  }

  public speak(text: string, options: SpeechOptions = {}): void {
    this.stop();
    const id = this.playbackId;
    this.cancelPlayback = options.onCancel;
    let finished = false;
    const finish = () => {
      if (id !== this.playbackId || finished) return;
      finished = true;
      this.recording = null;
      this.cancelPlayback = undefined;
      options.onEnd?.();
    };
    const browserFallback = () => {
      if (id !== this.playbackId || finished) return;
      this.recording = null;
      if (!this.synth) {
        this.playHarmonicFallback();
        this.fallbackTimer = setTimeout(finish, 600);
        return;
      }
      if (!this.isVoiceInitialized) this.initVoices();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.arabicVoice?.lang || 'ar-SA';
      if (this.arabicVoice) utterance.voice = this.arabicVoice;
      utterance.rate = options.rate ?? 0.85;
      utterance.pitch = options.pitch ?? 1;
      utterance.onend = finish;
      utterance.onerror = finish;
      try { this.synth.speak(utterance); }
      catch { this.playHarmonicFallback(); finish(); }
    };
    const file = this.hasRecording(text) ? this.recordings[normalizeAudioText(text)] : undefined;
    if (!file || typeof Audio === 'undefined') { browserFallback(); return; }
    let failed = false;
    const fallback = () => {
      if (failed || id !== this.playbackId || finished) return;
      failed = true;
      if (this.recording) {
        this.recording.onended = null;
        this.recording.onerror = null;
        this.recording.pause();
      }
      browserFallback();
    };
    try {
      const url = new URL(file, new URL(this.audioBase, window.location.href));
      const audio = new Audio(url.href);
      this.recording = audio;
      // Recordings are generated at normal speed; browser playback preserves pitch.
      audio.playbackRate = Math.min(2, Math.max(0.5, options.rate ?? 0.85));
      audio.preservesPitch = true;
      audio.onended = finish;
      audio.onerror = fallback;
      audio.play().catch(fallback);
    } catch { fallback(); }
  }

  public stop(): void {
    this.playbackId++;
    if (this.fallbackTimer) clearTimeout(this.fallbackTimer);
    if (this.recording) {
      this.recording.onended = null;
      this.recording.onerror = null;
      this.recording.pause();
      this.recording = null;
    }
    this.synth?.cancel();
    const cancel = this.cancelPlayback;
    this.cancelPlayback = undefined;
    cancel?.();
  }

  private chimeCtx: AudioContext | null = null;

  private getChimeContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.chimeCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.chimeCtx = new AudioCtx();
      }
    }
    if (this.chimeCtx && this.chimeCtx.state === 'suspended') {
      this.chimeCtx.resume().catch(() => {});
    }
    return this.chimeCtx;
  }

  // Soft melodic chime for feedback or fallback
  public playChime(type: 'success' | 'click' | 'correct' | 'wrong' | 'celebrate'): void {
    try {
      const ctx = this.getChimeContext();
      if (!ctx) return;

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
      onError('Speech server busy. You can record your voice below for playback comparison.');
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
