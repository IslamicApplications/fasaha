import React, { useState } from 'react';
import { BookOpen, PenTool, Sparkles, Volume2, Eye, EyeOff, CheckCircle2, HelpCircle, Keyboard, Headphones, ScrollText } from 'lucide-react';
import { READING_PASSAGES } from '../data/readingData';
import { ReadingPassage, ReadingSentence, ReadingWord } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { ScriptConnectorLab } from './ScriptConnectorLab';
import { LetterCanvas } from './LetterCanvas';
import { VirtualKeyboard } from './VirtualKeyboard';
import { QuranicReader } from './QuranicReader';
import { DictationStudio } from './DictationStudio';
import { arabicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ReadingWritingModuleProps {
  onAddXp: (amount: number) => void;
  completedReading: string[];
  onToggleCompleteReading: (id: string) => void;
}

export const ReadingWritingModule: React.FC<ReadingWritingModuleProps> = ({
  onAddXp,
  completedReading = [],
  onToggleCompleteReading,
}) => {
  const safeCompleted = completedReading || [];
  const [activeTab, setActiveTab] = useState<'reading' | 'quranic' | 'connector' | 'dictation' | 'writing_studio'>('reading');
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage>(READING_PASSAGES[0]);
  const [showTashkeel, setShowTashkeel] = useState(true);
  const [selectedWord, setSelectedWord] = useState<ReadingWord | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<number | null>(null);

  // Comprehension quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Typing practice state
  const [typedText, setTypedText] = useState('');
  const targetExerciseSentence = 'أَنَا أَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ بِفَصَاحَةٍ.';

  const handleWordClick = (word: ReadingWord) => {
    arabicAudio.playChime('click');
    setSelectedWord(word);
    arabicAudio.speak(word.arabic);
  };

  const handlePlaySentence = (sentence: ReadingSentence) => {
    setActiveSentenceId(sentence.id);
    arabicAudio.speak(sentence.arabic, {
      onEnd: () => setActiveSentenceId(null),
    });
  };

  const handleCheckComprehension = () => {
    setShowQuizResults(true);
    let correctCount = 0;
    selectedPassage.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === selectedPassage.questions.length) {
      onAddXp(30);
      onToggleCompleteReading(selectedPassage.id);
      arabicAudio.playChime('celebrate');
      confetti({ particleCount: 90, spread: 60 });
    } else {
      arabicAudio.playChime('correct');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">قراءة وكتابة</span>
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-800/80 text-teal-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Step 3: Script & Structure
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Reading & Writing Laboratory (مُخْتَبَرُ القِرَاءَةِ وَالكِتَابَةِ)
          </h2>
          <p className="text-teal-100/90 text-sm md:text-base leading-relaxed">
            Practice reading authentic graded texts, study Quranic & classical verse morphology, master cursive script connections, and train your ear with audio dictation.
          </p>

          {/* Subnavigation Tabs */}
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('reading')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'reading'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-teal-950/40 text-teal-100 hover:bg-teal-950/70'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Graded Stories
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quranic')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'quranic'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-teal-950/40 text-teal-100 hover:bg-teal-950/70'
              }`}
            >
              <ScrollText className="w-4 h-4" /> Classical & Qur’an Reader
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('connector')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'connector'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-teal-950/40 text-teal-100 hover:bg-teal-950/70'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Script Connector Lab
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dictation')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'dictation'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-teal-950/40 text-teal-100 hover:bg-teal-950/70'
              }`}
            >
              <Headphones className="w-4 h-4" /> Audio Dictation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('writing_studio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'writing_studio'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-teal-950/40 text-teal-100 hover:bg-teal-950/70'
              }`}
            >
              <PenTool className="w-4 h-4" /> Writing Pad
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: INTERACTIVE READING ROOM */}
      {activeTab === 'reading' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Story Reader & Text Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Story Picker */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {READING_PASSAGES.map((passage) => (
                <button
                  key={passage.id}
                  type="button"
                  onClick={() => {
                    arabicAudio.playChime('click');
                    setSelectedPassage(passage);
                    setSelectedWord(null);
                    setShowQuizResults(false);
                    setQuizAnswers({});
                  }}
                  className={`p-3 rounded-2xl text-left border transition shrink-0 min-w-[200px] ${
                    selectedPassage.id === passage.id
                      ? 'bg-teal-600 text-white border-teal-500 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        selectedPassage.id === passage.id
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {passage.level}
                    </span>
                    {safeCompleted.includes(passage.id) && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm leading-tight">{passage.titleEn}</h4>
                  <p className="font-arabic text-sm opacity-90 mt-0.5" dir="rtl">
                    {passage.titleAr}
                  </p>
                </button>
              ))}
            </div>

            {/* Reading Passage Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
              {/* Header Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-arabic text-3xl font-bold text-slate-900 dark:text-white" dir="rtl">
                    {selectedPassage.titleAr}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedPassage.titleEn} • {selectedPassage.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTashkeel(!showTashkeel)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      showTashkeel
                        ? 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {showTashkeel ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {showTashkeel ? 'Tashkeel: ON' : 'Tashkeel: OFF'}
                  </button>
                </div>
              </div>

              {/* Story Sentences with interactive word tokens */}
              <div className="space-y-6">
                {selectedPassage.sentences.map((sent) => {
                  const isActive = activeSentenceId === sent.id;

                  return (
                    <div
                      key={sent.id}
                      className={`p-5 rounded-2xl border transition duration-200 space-y-3 ${
                        isActive
                          ? 'bg-teal-50/70 dark:bg-teal-950/30 border-teal-400 ring-2 ring-teal-400/40'
                          : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:border-teal-300'
                      }`}
                    >
                      <div
                        className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-right"
                        dir="rtl"
                      >
                        {sent.words.map((w, wIdx) => {
                          const displayArabic = showTashkeel
                            ? w.arabic
                            : w.arabic.replace(/[\u064B-\u065F\u0670]/g, '');

                          return (
                            <button
                              key={wIdx}
                              type="button"
                              onClick={() => handleWordClick(w)}
                              className="font-arabic text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-100/60 dark:hover:bg-teal-950/60 px-1.5 py-0.5 rounded-lg transition-all active:scale-95"
                              title="Click for word definition and audio"
                            >
                              {displayArabic}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                        <p className="text-slate-600 dark:text-slate-300 italic">
                          "{sent.english}"
                        </p>
                        <button
                          type="button"
                          onClick={() => handlePlaySentence(sent)}
                          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold px-2 py-1 bg-teal-50 dark:bg-teal-950 rounded-lg"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedPassage.culturalNote && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-xs text-amber-900 dark:text-amber-200">
                  <strong className="text-amber-950 dark:text-amber-100">🌿 Cultural Insight: </strong>
                  {selectedPassage.culturalNote}
                </div>
              )}
            </div>

            {/* Reading Comprehension Quiz Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  Reading Comprehension Questions
                </h4>
              </div>

              <div className="space-y-4">
                {selectedPassage.questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">
                      {q.questionEn}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = quizAnswers[q.id] === oIdx;
                        const isCorrect = oIdx === q.correctIndex;
                        let btnStyle = 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

                        if (showQuizResults) {
                          if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-500';
                          else if (isChosen) btnStyle = 'bg-rose-600 text-white border-rose-500';
                        } else if (isChosen) {
                          btnStyle = 'bg-teal-600 text-white border-teal-500';
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIdx })}
                            className={`p-3 rounded-xl border text-xs font-semibold text-left transition ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <p className="text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleCheckComprehension}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition shadow-md"
                >
                  Check Answers & Complete Reading (+30 XP)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Word Gloss Popover (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="sticky top-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Instant Word Glossary (مُعْجَمُ الكَلِمَاتِ)
              </h4>

              {selectedWord ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-teal-50 dark:bg-teal-950/40 p-6 rounded-2xl border border-teal-200 dark:border-teal-800 text-center space-y-2">
                    <span className="font-arabic text-5xl font-bold text-teal-800 dark:text-teal-300 block">
                      {selectedWord.arabic}
                    </span>
                    <span className="text-sm font-bold text-teal-600 dark:text-teal-400 block">
                      {selectedWord.transliteration}
                    </span>
                    <AudioPlayerButton text={selectedWord.arabic} variant="primary" size="sm" label="Listen" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <span className="text-slate-400">English:</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedWord.english}</strong>
                    </div>

                    {selectedWord.grammarNote && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-blue-900 dark:text-blue-200">
                        <strong>Grammar Note: </strong>
                        {selectedWord.grammarNote}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                  <BookOpen className="w-8 h-8 mx-auto opacity-30 text-teal-600" />
                  <p>Click any word in the passage to view its instant translation, audio, and grammatical note!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CLASSICAL & QURANIC READER */}
      {activeTab === 'quranic' && <QuranicReader onAddXp={onAddXp} />}

      {/* SUBTAB 3: SCRIPT CONNECTOR LAB */}
      {activeTab === 'connector' && <ScriptConnectorLab />}

      {/* SUBTAB 4: AUDIO DICTATION STUDIO */}
      {activeTab === 'dictation' && <DictationStudio onAddXp={onAddXp} />}

      {/* SUBTAB 5: WRITING PAD */}
      {activeTab === 'writing_studio' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                <PenTool className="w-5 h-5 text-teal-600" />
                Ruled Calligraphy Copybook
              </h3>
              <LetterCanvas
                guideLetter="أنا أتعلم"
                height={280}
                onCompleted={() => onAddXp(25)}
              />
            </div>

            <div className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-emerald-600" />
                  Arabic Typing Practice
                </h3>
                <AudioPlayerButton text={targetExerciseSentence} size="sm" variant="ghost" />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target sentence:</span>
                <p className="font-arabic text-2xl font-bold text-emerald-700 dark:text-emerald-400 text-right" dir="rtl">
                  {targetExerciseSentence}
                </p>
                <p className="text-xs text-slate-500 italic">"I am learning the Arabic language with fluency."</p>
              </div>

              <div className="relative">
                <textarea
                  rows={2}
                  dir="rtl"
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  placeholder="Use the virtual keyboard below or your physical keyboard..."
                  className="w-full p-4 font-arabic text-2xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <VirtualKeyboard
                onInsertChar={(char) => setTypedText((prev) => prev + char)}
                onBackspace={() => setTypedText((prev) => prev.slice(0, -1))}
                onClear={() => setTypedText('')}
                onEnter={() => {
                  if (typedText.trim()) {
                    arabicAudio.playChime('celebrate');
                    confetti({ particleCount: 70 });
                    onAddXp(30);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
