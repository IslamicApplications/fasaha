import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Volume2, User, CheckCircle2 } from 'lucide-react';
import { CONVERSATION_DIALOGUES } from '../data/conversationData';
import { ConversationDialogue, DialogueLine } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio, createArabicSpeechRecognizer, calculateArabicMatchScore } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ConversationModuleProps {
  onAddXp: (amount: number) => void;
  completedDialogues: string[];
  onToggleCompleteDialogue: (id: string) => void;
}

export const ConversationModule: React.FC<ConversationModuleProps> = ({
  onAddXp,
  completedDialogues,
  onToggleCompleteDialogue,
}) => {
  const [selectedDialogue, setSelectedDialogue] = useState<ConversationDialogue>(CONVERSATION_DIALOGUES[0]);
  const [activeLineId, setActiveLineId] = useState<number | null>(null);
  
  // Speech Recognition state
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [targetPracticeLine, setTargetPracticeLine] = useState<DialogueLine>(selectedDialogue.dialogue[0]);
  const [speechError, setSpeechError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recognizer, setRecognizer] = useState<any>(null);

  // Roleplay mode state
  const [roleplayMode, setRoleplayMode] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'A' | 'B'>('B');

  useEffect(() => {
    setTargetPracticeLine(selectedDialogue.dialogue[0]);
    setSpeechTranscript('');
    setSpeechScore(null);
  }, [selectedDialogue]);

  const handleStartSpeechPractice = (line: DialogueLine) => {
    setTargetPracticeLine(line);
    setSpeechTranscript('');
    setSpeechScore(null);
    setSpeechError(null);

    const rec = createArabicSpeechRecognizer(
      (transcript, isFinal) => {
        setSpeechTranscript(transcript);
        if (isFinal) {
          const score = calculateArabicMatchScore(line.arabic, transcript);
          setSpeechScore(score);
          setIsRecording(false);

          if (score >= 70) {
            arabicAudio.playChime('celebrate');
            onAddXp(25);
            confetti({ particleCount: 50, spread: 50 });
          } else {
            arabicAudio.playChime('correct');
          }
        }
      },
      (err) => {
        setSpeechError(err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (rec) {
      setRecognizer(rec);
      setIsRecording(true);
      try {
        rec.start();
      } catch (e) {
        console.warn('Speech rec already started:', e);
      }
    }
  };

  const handleStopSpeechPractice = () => {
    if (recognizer) {
      recognizer.stop();
    }
    setIsRecording(false);
  };

  const handlePlayAllDialogue = async () => {
    for (let i = 0; i < selectedDialogue.dialogue.length; i++) {
      const line = selectedDialogue.dialogue[i];
      setActiveLineId(line.id);
      await new Promise<void>((resolve) => {
        arabicAudio.speak(line.arabic, {
          onEnd: () => {
            setTimeout(resolve, 600);
          },
        });
      });
    }
    setActiveLineId(null);
    onAddXp(20);
    onToggleCompleteDialogue(selectedDialogue.id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-900 to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">محادثة</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-800/80 text-cyan-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" /> Step 5: Conversational Practice
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Conversational Studio & Speech Lab (المُحَادَثَةُ وَالنُّطْقُ)
          </h2>
          <p className="text-cyan-100/90 text-sm md:text-base leading-relaxed">
            Engage in authentic real-life dialogues with native speaker audio, switch between roleplay avatars, and test your spoken Arabic pronunciation using microphone speech evaluation.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handlePlayAllDialogue}
              className="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-white text-cyan-950 shadow-md hover:bg-cyan-50"
            >
              <Volume2 className="w-4 h-4 text-cyan-600" /> Listen to Full Dialogue
            </button>
            <button
              type="button"
              onClick={() => setRoleplayMode(!roleplayMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                roleplayMode
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-cyan-950/50 text-cyan-100 hover:bg-cyan-950/80'
              }`}
            >
              <User className="w-4 h-4" /> {roleplayMode ? 'Roleplay Mode: Active' : 'Enter Roleplay Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dialogue Scenario Selector & Chat Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Scenario Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CONVERSATION_DIALOGUES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  arabicAudio.playChime('click');
                  setSelectedDialogue(d);
                }}
                className={`p-3 rounded-2xl text-left border transition shrink-0 min-w-[200px] ${
                  selectedDialogue.id === d.id
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-cyan-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      selectedDialogue.id === d.id
                        ? 'bg-cyan-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {d.level}
                  </span>
                  {completedDialogues.includes(d.id) && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  )}
                </div>
                <h4 className="font-bold text-sm leading-tight">{d.titleEn}</h4>
                <p className="font-arabic text-sm opacity-90 mt-0.5" dir="rtl">
                  {d.titleAr}
                </p>
              </button>
            ))}
          </div>

          {/* Dialogue Message Feed */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
            {/* Scenario Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 font-medium">
                🎭 <strong>Scenario:</strong> {selectedDialogue.scenario}
              </span>
              {roleplayMode && (
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-600 dark:text-slate-300">You are:</span>
                  <button
                    type="button"
                    onClick={() => setUserRole('A')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                      userRole === 'A' ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    {selectedDialogue.speakerA.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('B')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                      userRole === 'B' ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    {selectedDialogue.speakerB.name}
                  </button>
                </div>
              )}
            </div>

            {/* Chat Bubble Exchanges */}
            <div className="space-y-4">
              {selectedDialogue.dialogue.map((line) => {
                const isSpeakerA = line.speaker === 'A';
                const speakerMeta = isSpeakerA ? selectedDialogue.speakerA : selectedDialogue.speakerB;
                const isCurrentActive = activeLineId === line.id;
                const isUserRole = roleplayMode && userRole === line.speaker;

                return (
                  <div
                    key={line.id}
                    className={`flex items-start gap-3 ${isSpeakerA ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 flex items-center justify-center text-xl shrink-0 shadow-sm border border-cyan-200 dark:border-cyan-800">
                      {speakerMeta.avatar}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[82%] p-4 rounded-3xl space-y-2 border transition ${
                        isCurrentActive
                          ? 'ring-2 ring-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400'
                          : isUserRole
                          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                          : isSpeakerA
                          ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                          : 'bg-cyan-50/60 dark:bg-slate-800/90 border-cyan-100 dark:border-cyan-900/60'
                      }`}
                    >
                      {/* Name & Tools */}
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span>{speakerMeta.name}</span>
                        <div className="flex items-center gap-1">
                          <AudioPlayerButton text={line.arabic} size="sm" variant="ghost" />
                          <button
                            type="button"
                            onClick={() => handleStartSpeechPractice(line)}
                            title="Practice speaking this line"
                            className="p-1 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-100/50 rounded-lg transition"
                          >
                            <Mic className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Arabic Text */}
                      <p
                        className="font-arabic text-2xl font-bold text-slate-900 dark:text-white leading-relaxed text-right"
                        dir="rtl"
                      >
                        {line.arabic}
                      </p>

                      {/* Transliteration & English */}
                      <div className="text-xs space-y-0.5 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                        <p className="font-medium text-cyan-700 dark:text-cyan-300">{line.transliteration}</p>
                        <p className="text-slate-600 dark:text-slate-400 italic">"{line.english}"</p>
                      </div>

                      {/* Grammar Tip */}
                      {line.grammarTip && (
                        <p className="text-[10px] text-slate-500 bg-white/70 dark:bg-slate-900/70 p-2 rounded-xl mt-1">
                          💡 {line.grammarTip}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Microphone Speech Evaluation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                🎙️ AI Pronunciation Trainer
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Speak in Arabic
              </h3>
              <p className="text-xs text-slate-500">
                Read the highlighted phrase aloud into your microphone to get instant recognition feedback.
              </p>
            </div>

            {/* Target Phrase Box */}
            <div className="p-5 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 text-center space-y-3">
              <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                Target Phrase to Speak:
              </span>
              <h4 className="font-arabic text-3xl font-bold text-slate-900 dark:text-white" dir="rtl">
                {targetPracticeLine.arabic}
              </h4>
              <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                {targetPracticeLine.transliteration}
              </p>
              <div className="flex items-center justify-center gap-2">
                <AudioPlayerButton text={targetPracticeLine.arabic} variant="primary" size="sm" label="Model Audio" />
              </div>
            </div>

            {/* Microphone Button */}
            <div className="text-center space-y-3">
              <button
                type="button"
                onClick={() => {
                  if (isRecording) {
                    handleStopSpeechPractice();
                  } else {
                    handleStartSpeechPractice(targetPracticeLine);
                  }
                }}
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white transition-all transform active:scale-95 shadow-xl ${
                  isRecording
                    ? 'bg-rose-600 animate-pulse ring-4 ring-rose-400'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-105'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {isRecording ? 'Listening in Arabic... Speak now!' : 'Click to Speak'}
              </p>
            </div>

            {/* Live Transcript & Recognition Score */}
            {speechTranscript && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  You Spoke:
                </span>
                <p className="font-arabic text-xl font-bold text-slate-900 dark:text-white text-right" dir="rtl">
                  {speechTranscript}
                </p>

                {speechScore !== null && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Pronunciation Match:</span>
                    <span
                      className={`text-sm font-extrabold px-3 py-1 rounded-full ${
                        speechScore >= 70
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {speechScore}%
                    </span>
                  </div>
                )}
              </div>
            )}

            {speechError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-900 dark:text-rose-200 text-xs">
                ⚠️ {speechError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
