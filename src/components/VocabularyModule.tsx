import React, { useState, useMemo, useEffect } from 'react';
import { Bookmark, Search, CheckCircle, ChevronLeft, ChevronRight, Layers, Gamepad2, BookOpen, Plus, Sparkles, Clock, Calendar } from 'lucide-react';
import { VOCAB_CATEGORIES, VOCAB_WORDS } from '../data/vocabData';
import { VocabWord } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';
import { SRSItem, calculateNextSRS, SRSGrade, isDueForReview } from '../utils/srs';
import confetti from 'canvas-confetti';

interface VocabularyModuleProps {
  onAddXp: (amount: number) => void;
  masteredVocab: string[];
  bookmarkedVocab: string[];
  onToggleMaster: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  onAddXp,
  masteredVocab = [],
  bookmarkedVocab = [],
  onToggleMaster,
  onToggleBookmark,
}) => {
  const safeMastered = masteredVocab || [];
  const safeBookmarked = bookmarkedVocab || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'flashcards' | 'grid' | 'match_game' | 'custom_notebook'>('flashcards');
  
  // Flashcard Deck state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTranslit, setShowTranslit] = useState(true);

  // Custom Words state (persisted in localStorage)
  const [customWords, setCustomWords] = useState<VocabWord[]>(() => {
    try {
      const saved = localStorage.getItem('fasaha_custom_vocab');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [newArWord, setNewArWord] = useState('');
  const [newEnWord, setNewEnWord] = useState('');
  const [newTranslit, setNewTranslit] = useState('');

  // SRS State
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    try {
      const saved = localStorage.getItem('fasaha_srs_data');
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  });

  // Match Game state
  const [gameSelectedArabic, setGameSelectedArabic] = useState<string | null>(null);
  const [gameSelectedEnglish, setGameSelectedEnglish] = useState<string | null>(null);
  const [gameMatchedIds, setGameMatchedIds] = useState<string[]>([]);
  const [gameScore, setGameScore] = useState(0);

  // Combine default words with custom words
  const allVocabWords = useMemo(() => {
    return [...VOCAB_WORDS, ...customWords];
  }, [customWords]);

  // Filtered vocabulary list
  const filteredWords = useMemo(() => {
    return allVocabWords.filter((w) => {
      const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
      const matchesSearch =
        w.arabic.includes(searchQuery) ||
        w.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.english.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allVocabWords, selectedCategory, searchQuery]);

  const [reviewTime, setReviewTime] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setReviewTime(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const reviewWords = useMemo(() => filteredWords.filter(word =>
    !srsItems[word.id] || isDueForReview(srsItems[word.id], reviewTime)
  ), [filteredWords, srsItems, reviewTime]);

  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
    setGameMatchedIds([]);
    setGameSelectedArabic(null);
    setGameSelectedEnglish(null);
    setGameScore(0);
  }, [selectedCategory, searchQuery]);

  const reviewIndex = reviewWords.length ? cardIndex % reviewWords.length : 0;
  const currentWord: VocabWord | undefined = reviewWords[reviewIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (reviewWords.length) setCardIndex((prev) => (prev + 1) % reviewWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (reviewWords.length) setCardIndex((prev) => (prev - 1 + reviewWords.length) % reviewWords.length);
  };

  const handleFlipCard = () => {
    arabicAudio.playChime('click');
    setIsFlipped(!isFlipped);
  };

  const recallInterval = (grade: SRSGrade) => currentWord ? calculateNextSRS(
    srsItems[currentWord.id] || {
      id: currentWord.id, interval: 1, repetition: 0,
      easinessFactor: 2.5, nextReviewDate: '',
    }, grade
  ).interval : 0;

  const handleGradeSRS = (grade: SRSGrade) => {
    if (!currentWord) return;
    const currentSRS: SRSItem = srsItems[currentWord.id] || {
      id: currentWord.id,
      interval: 1,
      repetition: 0,
      easinessFactor: 2.5,
      nextReviewDate: new Date().toISOString(),
    };

    const nextSRS = calculateNextSRS(currentSRS, grade);
    const updated = { ...srsItems, [currentWord.id]: nextSRS };
    setSrsItems(updated);
    try { localStorage.setItem('fasaha_srs_data', JSON.stringify(updated)); } catch { /* Keep the session usable if storage is full. */ }

    if (grade >= 4) {
      arabicAudio.playChime('celebrate');
      onAddXp(20);
    } else {
      arabicAudio.playChime('correct');
      onAddXp(10);
    }

    setIsFlipped(false);
    setCardIndex(reviewIndex);
  };

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArWord.trim() || !newEnWord.trim()) return;

    const newWord: VocabWord = {
      id: `custom-${Date.now()}`,
      arabic: newArWord.trim(),
      transliteration: newTranslit.trim() || newArWord.trim(),
      english: newEnWord.trim(),
      category: 'custom',
    };

    const updated = [newWord, ...customWords];
    setCustomWords(updated);
    localStorage.setItem('fasaha_custom_vocab', JSON.stringify(updated));
    setNewArWord('');
    setNewEnWord('');
    setNewTranslit('');
    arabicAudio.playChime('celebrate');
    onAddXp(25);
    confetti({ particleCount: 60 });
  };

  // Match Game logic: take 6 random words
  const matchGameWords = useMemo(() => {
    return filteredWords.slice(0, 6);
  }, [filteredWords]);

  const shuffledEnglish = useMemo(() => {
    return [...matchGameWords].sort(() => Math.random() - 0.5);
  }, [matchGameWords]);

  const handleMatchCheck = (arabicId: string | null, englishId: string | null) => {
    if (!arabicId || !englishId) return;

    if (arabicId === englishId) {
      arabicAudio.playChime('correct');
      setGameMatchedIds((prev) => [...prev, arabicId]);
      setGameScore((prev) => prev + 10);
      onAddXp(15);
      setGameSelectedArabic(null);
      setGameSelectedEnglish(null);

      if (gameMatchedIds.length + 1 === matchGameWords.length) {
        confetti({ particleCount: 80, spread: 60 });
      }
    } else {
      arabicAudio.playChime('wrong');
      setTimeout(() => {
        setGameSelectedArabic(null);
        setGameSelectedEnglish(null);
      }, 500);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">مفردات</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-800/80 text-blue-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Step 2: Lexical Fluency
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Arabic Vocabulary & Spaced Repetition (SRS)
          </h2>
          <p className="text-blue-100/90 text-sm md:text-base leading-relaxed">
            Expand your Arabic lexicon with 3D flashcards powered by the SM-2 spaced repetition algorithm, create custom notebooks, and play matching games.
          </p>

          {/* View Modes */}
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <button
              type="button"
              onClick={() => setViewMode('flashcards')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'flashcards'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'bg-blue-950/40 text-blue-100 hover:bg-blue-950/70'
              }`}
            >
              <Layers className="w-4 h-4" /> 3D Flashcards
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'bg-blue-950/40 text-blue-100 hover:bg-blue-950/70'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Word Catalog ({allVocabWords.length})
            </button>
            <button
              type="button"
              onClick={() => setViewMode('match_game')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'match_game'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'bg-blue-950/40 text-blue-100 hover:bg-blue-950/70'
              }`}
            >
              <Gamepad2 className="w-4 h-4" /> Matching Game
            </button>
            <button
              type="button"
              onClick={() => setViewMode('custom_notebook')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'custom_notebook'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-blue-950/40 text-blue-100 hover:bg-blue-950/70'
              }`}
            >
              <Plus className="w-4 h-4" /> Custom Notebook ({customWords.length})
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Themes ({allVocabWords.length})
          </button>
          {VOCAB_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setCardIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{cat.nameEn}</span>
              <span className="font-arabic opacity-70">({cat.nameAr})</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px] w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Arabic or English..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* VIEW 1: 3D FLASHCARDS WITH SM-2 SPACED REPETITION */}
      {viewMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          {currentWord ? (
            <>
              {/* Top Card Navigation Status */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Due card {reviewIndex + 1} of {reviewWords.length}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowTranslit(!showTranslit)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showTranslit ? 'Hide Transliteration' : 'Show Transliteration'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(currentWord.id)}
                    className={`p-1.5 rounded-lg transition ${
                      bookmarkedVocab.includes(currentWord.id)
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Flippable Card Container */}
              <div
                className="perspective-1000 min-h-[340px] cursor-pointer"
                onClick={handleFlipCard}
              >
                <div
                  className={`relative w-full h-full min-h-[340px] transition-transform duration-500 transform-style-3d rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between ${
                    isFlipped
                      ? 'rotate-y-180 bg-gradient-to-br from-indigo-900 to-slate-900 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                  }`}
                >
                  {/* FRONT of Card (Arabic Focus) */}
                  {!isFlipped ? (
                    <div className="space-y-6 text-center my-auto">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full">
                        {currentWord.category.toUpperCase()} • Click to Flip
                      </span>

                      <div className="space-y-3">
                        <h3 className="font-arabic text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-relaxed">
                          {currentWord.arabic}
                        </h3>

                        {showTranslit && (
                          <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                            {currentWord.transliteration}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-2">
                        <AudioPlayerButton
                          text={currentWord.arabic}
                          size="md"
                          variant="primary"
                          label="Pronounce"
                        />
                      </div>
                    </div>
                  ) : (
                    /* BACK of Card (English Meaning & Example Sentence) */
                    <div className="space-y-5 text-center my-auto rotate-y-180">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full">
                        Meaning & Usage
                      </span>

                      <div>
                        <h4 className="text-3xl font-extrabold text-white">
                          {currentWord.english}
                        </h4>
                        {currentWord.plural && (
                          <p className="text-xs text-indigo-300 mt-1">
                            Plural: <span className="font-arabic text-sm">{currentWord.plural}</span>
                          </p>
                        )}
                      </div>

                      {currentWord.exampleSentence && (
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-left space-y-1 text-xs">
                          <span className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider">Example:</span>
                          <p className="font-arabic text-lg font-bold text-emerald-300 text-right" dir="rtl">
                            {currentWord.exampleSentence.arabic}
                          </p>
                          <p className="text-slate-300 italic">
                            "{currentWord.exampleSentence.english}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Footer Hint */}
                  <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    🔄 Click anywhere on the card to flip
                  </div>
                </div>
              </div>

              {/* SM-2 Spaced Repetition Rating Buttons */}
              {isFlipped ? (
                <div className="space-y-2 pt-2 animate-fadeIn">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                    Rate Recall Difficulty (SM-2 Interval Calculator):
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => handleGradeSRS(1)}
                      className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 rounded-xl text-xs font-bold transition text-center"
                    >
                      Again <span className="block text-[10px] font-normal opacity-80">{recallInterval(1)} days</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGradeSRS(3)}
                      className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-xl text-xs font-bold transition text-center"
                    >
                      Hard <span className="block text-[10px] font-normal opacity-80">{recallInterval(3)} days</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGradeSRS(4)}
                      className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded-xl text-xs font-bold transition text-center"
                    >
                      Good <span className="block text-[10px] font-normal opacity-80">{recallInterval(4)} days</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGradeSRS(5)}
                      className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl text-xs font-bold transition text-center"
                    >
                      Easy <span className="block text-[10px] font-normal opacity-80">{recallInterval(5)} days</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Bottom Controls */
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onToggleMaster(currentWord.id);
                      if (!masteredVocab.includes(currentWord.id)) {
                        onAddXp(20);
                        arabicAudio.playChime('celebrate');
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm ${
                      masteredVocab.includes(currentWord.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {masteredVocab.includes(currentWord.id) ? 'Mastered (+20 XP)' : 'Mark Mastered'}
                  </button>

                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold transition"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              {filteredWords.length ? 'All reviews complete. Come back when your next cards are due.' : 'No words found matching your search.'}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: WORD GRID CATALOG */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => {
            const isMastered = masteredVocab.includes(word.id);
            const isBookmarked = bookmarkedVocab.includes(word.id);

            return (
              <div
                key={word.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                    {word.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(word.id)}
                      className={`p-1 rounded-lg transition ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleMaster(word.id)}
                      className={`p-1 rounded-lg transition ${
                        isMastered ? 'text-emerald-500' : 'text-slate-300 hover:text-slate-500'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between" dir="rtl">
                  <h4 className="font-arabic text-3xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {word.arabic}
                  </h4>
                  <AudioPlayerButton text={word.arabic} size="sm" variant="ghost" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {word.transliteration}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {word.english}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: MATCH GAME */}
      {viewMode === 'match_game' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Interactive Vocabulary Pairing Game
              </h3>
              <p className="text-xs text-slate-500">
                Click an Arabic word, then click its corresponding English meaning!
              </p>
            </div>
            <div className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold">
              Score: {gameScore} pts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Arabic Words
              </h4>
              {matchGameWords.map((w) => {
                const isMatched = gameMatchedIds.includes(w.id);
                const isSelected = gameSelectedArabic === w.id;

                return (
                  <button
                    key={w.id}
                    type="button"
                    disabled={isMatched}
                    onClick={() => {
                      arabicAudio.playChime('click');
                      setGameSelectedArabic(w.id);
                      handleMatchCheck(w.id, gameSelectedEnglish);
                    }}
                    className={`w-full p-4 rounded-2xl border text-right font-arabic text-2xl font-bold transition flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-300 opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400'
                        : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
                    }`}
                    dir="rtl"
                  >
                    <span>{w.arabic}</span>
                    {isMatched && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                English Meanings
              </h4>
              {shuffledEnglish.map((w) => {
                const isMatched = gameMatchedIds.includes(w.id);
                const isSelected = gameSelectedEnglish === w.id;

                return (
                  <button
                    key={w.id}
                    type="button"
                    disabled={isMatched}
                    onClick={() => {
                      arabicAudio.playChime('click');
                      setGameSelectedEnglish(w.id);
                      handleMatchCheck(gameSelectedArabic, w.id);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-bold transition flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-300 opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400'
                        : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{w.english}</span>
                    {isMatched && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: CUSTOM VOCABULARY NOTEBOOK */}
      {viewMode === 'custom_notebook' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Add to Your Personal Vocabulary Notebook
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Save words you encounter in daily reading or conversation with automatic audio pronunciation.
              </p>
            </div>

            <form onSubmit={handleAddCustomWord} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Arabic Word (الكلمة):</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    placeholder="مثال: شَمْس"
                    value={newArWord}
                    onChange={(e) => setNewArWord(e.target.value)}
                    className="w-full p-3 font-arabic text-xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">English Translation:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sun"
                    value={newEnWord}
                    onChange={(e) => setNewEnWord(e.target.value)}
                    className="w-full p-3 text-sm font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Transliteration (Optional):</label>
                <input
                  type="text"
                  placeholder="e.g. Shams"
                  value={newTranslit}
                  onChange={(e) => setNewTranslit(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                Save Word to Notebook (+25 XP)
              </button>
            </form>
          </div>

          {/* Custom Words List */}
          {customWords.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Saved Words ({customWords.length}):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customWords.map((cw) => (
                  <div
                    key={cw.id}
                    className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-arabic text-2xl font-bold text-slate-900 dark:text-white" dir="rtl">{cw.arabic}</h5>
                      <p className="text-xs text-blue-600 font-semibold">{cw.transliteration}</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{cw.english}</p>
                    </div>
                    <AudioPlayerButton text={cw.arabic} size="sm" variant="ghost" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
