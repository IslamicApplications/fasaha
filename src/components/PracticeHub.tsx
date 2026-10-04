import React, { useState } from 'react';
import { Trophy, Zap, Award, RotateCcw, Shuffle } from 'lucide-react';
import { UserStats } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PracticeHubProps {
  stats: UserStats;
  onAddXp: (amount: number) => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({ stats, onAddXp }) => {
  const [activeMode, setActiveMode] = useState<'daily' | 'scramble' | 'badges'>('daily');

  // Daily Challenge state
  const dailyQuestions = [
    {
      q: 'Translate: "Good morning" into Arabic:',
      options: ['صَبَاحُ الخَيْرِ', 'مَسَاءُ الخَيْرِ', 'مَعَ السَّلاَمَةِ', 'شُكْرًا'],
      correct: 0,
    },
    {
      q: 'Which letter requires the "Al-" prefix to assimilate (Sun Letter)?',
      options: ['ش (Sheen)', 'ق (Qaaf)', 'ب (Baa)', 'م (Meem)'],
      correct: 0,
    },
    {
      q: 'Complete the sentence: "أَنَا _____ اللُّغَةَ العَرَبِيَّةَ" (I am learning):',
      options: ['أَتَعَلَّمُ', 'تَتَعَلَّمُ', 'يَتَعَلَّمُ', 'نَتَعَلَّمُ'],
      correct: 0,
    },
    {
      q: 'What is the plural of "كِتَابٌ" (Book)?',
      options: ['كُتُبٌ (Kutub)', 'كِتَابَاتٌ', 'أَكْتَابٌ', 'كَاتِبُونَ'],
      correct: 0,
    },
    {
      q: 'In the proverb "الصَّبْرُ مِفْتَاحُ الفَرَجِ", what is the meaning of "الصَّبْرُ"?',
      options: ['Patience', 'Honesty', 'Knowledge', 'Courage'],
      correct: 0,
    },
  ];

  const [dailyIdx, setDailyIdx] = useState(0);
  const [dailyScore, setDailyScore] = useState(0);
  const [dailyFinished, setDailyFinished] = useState(false);
  const [dailySelected, setDailySelected] = useState<number | null>(null);

  // Scramble Game state
  const scramblePuzzles = [
    { target: 'كِتَابٌ', meaning: 'Book', letters: ['ب', 'ا', 'ت', 'ك'] },
    { target: 'مَدْرَسَةٌ', meaning: 'School', letters: ['ة', 'س', 'ر', 'د', 'م'] },
    { target: 'حَدِيقَةٌ', meaning: 'Garden', letters: ['ة', 'ق', 'ي', 'د', 'ح'] },
    { target: 'صَبَاحٌ', meaning: 'Morning', letters: ['ح', 'ا', 'ب', 'ص'] },
  ];

  const [scrambleIdx, setScrambleIdx] = useState(0);
  const [currentSlots, setCurrentSlots] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(scramblePuzzles[0].letters);
  const [scrambleComplete, setScrambleComplete] = useState(false);

  const handleDailyAnswer = (idx: number) => {
    if (dailySelected !== null) return;
    setDailySelected(idx);

    if (idx === dailyQuestions[dailyIdx].correct) {
      arabicAudio.playChime('correct');
      setDailyScore((prev) => prev + 1);
      onAddXp(20);
    } else {
      arabicAudio.playChime('wrong');
    }
  };

  const handleDailyNext = () => {
    if (dailyIdx + 1 < dailyQuestions.length) {
      setDailyIdx((prev) => prev + 1);
      setDailySelected(null);
    } else {
      setDailyFinished(true);
      arabicAudio.playChime('celebrate');
      confetti({ particleCount: 90 });
    }
  };

  const handleAddScrambleLetter = (letter: string, index: number) => {
    arabicAudio.playChime('click');
    setCurrentSlots([...currentSlots, letter]);
    const updated = [...availableLetters];
    updated.splice(index, 1);
    setAvailableLetters(updated);

    // Check if word is complete
    const testWord = [...currentSlots, letter].join('');
    const targetClean = scramblePuzzles[scrambleIdx].target.replace(/[\u064B-\u065F\u0670]/g, '');

    if (testWord === targetClean || testWord === scramblePuzzles[scrambleIdx].target) {
      setScrambleComplete(true);
      arabicAudio.playChime('celebrate');
      onAddXp(30);
      confetti({ particleCount: 70 });
    }
  };

  const handleResetScramble = () => {
    setCurrentSlots([]);
    setAvailableLetters(scramblePuzzles[scrambleIdx].letters);
    setScrambleComplete(false);
  };

  const handleNextScramble = () => {
    const nextIdx = (scrambleIdx + 1) % scramblePuzzles.length;
    setScrambleIdx(nextIdx);
    setCurrentSlots([]);
    setAvailableLetters(scramblePuzzles[nextIdx].letters);
    setScrambleComplete(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-rose-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">تحديات</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-300" /> Mastery Center
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Daily Practice & Skill Verification (مَرْكَزُ التَّحَدِّيَاتِ)
          </h2>
          <p className="text-amber-100/90 text-sm md:text-base leading-relaxed">
            Consolidate your knowledge across reading, vocabulary, grammar, and speech with timed challenges and scramble puzzles.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveMode('daily')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeMode === 'daily'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" /> Daily 5-Question Challenge
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('scramble')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeMode === 'scramble'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Shuffle className="w-4 h-4 text-amber-500" /> Letter Scramble Puzzle
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('badges')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeMode === 'badges'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" /> Achievements & Badges
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: DAILY 5-QUESTION CHALLENGE */}
      {activeMode === 'daily' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          {!dailyFinished ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider">
                  Challenge {dailyIdx + 1} of {dailyQuestions.length}
                </span>
                <span className="font-bold px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full">
                  Score: {dailyScore}
                </span>
              </div>

              <div className="text-center py-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {dailyQuestions[dailyIdx].q}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dailyQuestions[dailyIdx].options.map((opt, oIdx) => {
                  const isSelected = dailySelected === oIdx;
                  const isCorrect = oIdx === dailyQuestions[dailyIdx].correct;
                  let style = 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';

                  if (dailySelected !== null) {
                    if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-500 shadow-md';
                    else if (isSelected) style = 'bg-rose-600 text-white border-rose-500';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={dailySelected !== null}
                      onClick={() => handleDailyAnswer(oIdx)}
                      className={`p-4 rounded-2xl border text-sm font-arabic font-bold text-center transition ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {dailySelected !== null && (
                <button
                  type="button"
                  onClick={handleDailyNext}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition shadow-md mt-4"
                >
                  {dailyIdx + 1 < dailyQuestions.length ? 'Next Question ➔' : 'Complete Challenge 🎉'}
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                🌟
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Daily Challenge Complete!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You scored <strong className="text-amber-600 text-sm">{dailyScore}</strong> out of {dailyQuestions.length}!
              </p>
              <button
                type="button"
                onClick={() => {
                  setDailyIdx(0);
                  setDailyScore(0);
                  setDailySelected(null);
                  setDailyFinished(false);
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                Restart Challenge
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: SCRAMBLE PUZZLE */}
      {activeMode === 'scramble' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Arabic Word Scramble
              </h3>
              <p className="text-xs text-slate-500">
                Assemble the scrambled letters to spell the target word: <strong>"{scramblePuzzles[scrambleIdx].meaning}"</strong>
              </p>
            </div>
            <AudioPlayerButton text={scramblePuzzles[scrambleIdx].target} size="sm" variant="primary" />
          </div>

          {/* Target Word Slots */}
          <div className="p-8 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Constructed Word:
            </span>
            <div className="font-arabic text-6xl font-bold text-emerald-600 dark:text-emerald-400 h-20 flex items-center justify-center tracking-wide" dir="rtl">
              {currentSlots.join('') || '___'}
            </div>
            {scrambleComplete && (
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-xs font-bold animate-bounce">
                🎉 Correct! +30 XP
              </span>
            )}
          </div>

          {/* Available Letter Tiles to Click */}
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Click Letters in Order:
            </span>
            <div className="flex items-center justify-center gap-2 flex-wrap" dir="rtl">
              {availableLetters.map((l, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddScrambleLetter(l, idx)}
                  className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 font-arabic text-3xl font-bold text-slate-900 dark:text-white hover:border-amber-500 hover:scale-105 active:scale-95 transition shadow-sm"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleResetScramble}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>

            <button
              type="button"
              onClick={handleNextScramble}
              className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition shadow-md"
            >
              Next Word ➔
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: BADGES & ACHIEVEMENTS */}
      {activeMode === 'badges' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Your Arabic Mastery Badges & Achievements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'First Letter Master', desc: 'Mastered 5 alphabet letters', icon: '🔤', achieved: stats.completedLetters.length >= 5 },
              { title: 'Vocab Enthusiast', desc: 'Learned 10 new vocabulary words', icon: '📚', achieved: stats.masteredVocab.length >= 5 },
              { title: 'Calligrapher', desc: 'Completed handwriting tracing canvas', icon: '✍️', achieved: stats.xp >= 100 },
              { title: 'Fluent Speaker', desc: 'Tested speech in conversation studio', icon: '🎙️', achieved: stats.completedDialogues.length >= 1 },
              { title: 'Syntax Architect', desc: 'Completed 3 grammar modules', icon: '🏛️', achieved: stats.completedGrammar.length >= 3 },
              { title: 'Heritage Seeker', desc: 'Explored cultural proverbs & styles', icon: '🕌', achieved: true },
              { title: 'Streak Champion', desc: 'Maintained 3+ days active streak', icon: '🔥', achieved: stats.streak >= 1 },
              { title: 'Fasaha Scholar', desc: 'Earned 500+ XP in total learning', icon: '👑', achieved: stats.xp >= 500 },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border text-center space-y-2 transition ${
                  badge.achieved
                    ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div className="text-4xl">{badge.icon}</div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{badge.title}</h4>
                <p className="text-[11px] text-slate-500">{badge.desc}</p>
                {badge.achieved && (
                  <span className="inline-block text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                    Unlocked ✨
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
