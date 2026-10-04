import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AlphabetModule } from './components/AlphabetModule';
import { VocabularyModule } from './components/VocabularyModule';
import { ReadingWritingModule } from './components/ReadingWritingModule';
import { MorphologyLab } from './components/MorphologyLab';
import { GrammarModule } from './components/GrammarModule';
import { ConversationModule } from './components/ConversationModule';
import { CultureModule } from './components/CultureModule';
import { PracticeHub } from './components/PracticeHub';
import { ModuleType, UserStats } from './types';

const INITIAL_STATS: UserStats = {
  xp: 120,
  streak: 3,
  lastActiveDate: new Date().toISOString(),
  completedLetters: [1, 2, 3],
  masteredVocab: ['g-1', 'g-2', 'g-3', 'fd-1'],
  bookmarkedVocab: ['g-1', 'isl-1'],
  completedReading: [],
  completedGrammar: ['grammar-1'],
  completedDialogues: [],
  highScores: {},
  unlockedBadges: ['First Letter Master', 'Heritage Seeker'],
};

export function App() {
  const [currentModule, setCurrentModule] = useState<ModuleType>('alphabet');
  const [theme, setTheme] = useState<'light' | 'dark' | 'parchment'>(() => {
    const saved = localStorage.getItem('fasaha_theme');
    return (saved as any) || 'light';
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('fasaha_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATS,
          ...parsed,
          completedLetters: Array.isArray(parsed?.completedLetters) ? parsed.completedLetters : INITIAL_STATS.completedLetters,
          masteredVocab: Array.isArray(parsed?.masteredVocab) ? parsed.masteredVocab : INITIAL_STATS.masteredVocab,
          bookmarkedVocab: Array.isArray(parsed?.bookmarkedVocab) ? parsed.bookmarkedVocab : INITIAL_STATS.bookmarkedVocab,
          completedReading: Array.isArray(parsed?.completedReading) ? parsed.completedReading : INITIAL_STATS.completedReading,
          completedGrammar: Array.isArray(parsed?.completedGrammar) ? parsed.completedGrammar : INITIAL_STATS.completedGrammar,
          completedDialogues: Array.isArray(parsed?.completedDialogues) ? parsed.completedDialogues : INITIAL_STATS.completedDialogues,
          unlockedBadges: Array.isArray(parsed?.unlockedBadges) ? parsed.unlockedBadges : INITIAL_STATS.unlockedBadges,
        };
      } catch {
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });

  // Persist stats in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fasaha_stats', JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Handle Theme switching & root class manipulation
  useEffect(() => {
    try {
      localStorage.setItem('fasaha_theme', theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    root.classList.remove('dark', 'parchment-mode');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'parchment') {
      root.classList.add('parchment-mode');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'parchment';
      return 'light';
    });
  };

  const handleAddXp = (amount: number) => {
    setStats((prev) => ({
      ...prev,
      xp: (prev.xp || 0) + amount,
    }));
  };

  const handleToggleCompleteLetter = (id: number) => {
    setStats((prev) => {
      const letters = prev.completedLetters || [];
      const exists = letters.includes(id);
      return {
        ...prev,
        completedLetters: exists
          ? letters.filter((l) => l !== id)
          : [...letters, id],
      };
    });
  };

  const handleToggleMasterVocab = (id: string) => {
    setStats((prev) => {
      const list = prev.masteredVocab || [];
      const exists = list.includes(id);
      return {
        ...prev,
        masteredVocab: exists
          ? list.filter((v) => v !== id)
          : [...list, id],
      };
    });
  };

  const handleToggleBookmarkVocab = (id: string) => {
    setStats((prev) => {
      const list = prev.bookmarkedVocab || [];
      const exists = list.includes(id);
      return {
        ...prev,
        bookmarkedVocab: exists
          ? list.filter((v) => v !== id)
          : [...list, id],
      };
    });
  };

  const handleToggleCompleteReading = (id: string) => {
    setStats((prev) => {
      const list = prev.completedReading || [];
      if (list.includes(id)) return prev;
      return {
        ...prev,
        completedReading: [...list, id],
      };
    });
  };

  const handleToggleCompleteGrammar = (id: string) => {
    setStats((prev) => {
      const list = prev.completedGrammar || [];
      if (list.includes(id)) return prev;
      return {
        ...prev,
        completedGrammar: [...list, id],
      };
    });
  };

  const handleToggleCompleteDialogue = (id: string) => {
    setStats((prev) => {
      const list = prev.completedDialogues || [];
      if (list.includes(id)) return prev;
      return {
        ...prev,
        completedDialogues: [...list, id],
      };
    });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      theme === 'parchment' ? 'bg-[#fcfaf4] text-[#3c2f1f]' : 'bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100'
    }`}>
      {/* Top Navbar */}
      <Navbar
        stats={stats}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onSelectPractice={() => setCurrentModule('practice')}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with 7 Pedagogical Steps */}
          <Sidebar
            currentModule={currentModule}
            onSelectModule={setCurrentModule}
            stats={stats}
          />

          {/* Module Main View Area */}
          <main className="flex-1 min-w-0">
            {currentModule === 'alphabet' && (
              <AlphabetModule
                onAddXp={handleAddXp}
                completedLetters={stats.completedLetters || []}
                onToggleCompleteLetter={handleToggleCompleteLetter}
              />
            )}

            {currentModule === 'vocabulary' && (
              <VocabularyModule
                onAddXp={handleAddXp}
                masteredVocab={stats.masteredVocab || []}
                bookmarkedVocab={stats.bookmarkedVocab || []}
                onToggleMaster={handleToggleMasterVocab}
                onToggleBookmark={handleToggleBookmarkVocab}
              />
            )}

            {currentModule === 'reading_writing' && (
              <ReadingWritingModule
                onAddXp={handleAddXp}
                completedReading={stats.completedReading || []}
                onToggleCompleteReading={handleToggleCompleteReading}
              />
            )}

            {currentModule === 'morphology' && (
              <MorphologyLab onAddXp={handleAddXp} />
            )}

            {currentModule === 'grammar' && (
              <GrammarModule
                onAddXp={handleAddXp}
                completedGrammar={stats.completedGrammar || []}
                onToggleCompleteGrammar={handleToggleCompleteGrammar}
              />
            )}

            {currentModule === 'conversation' && (
              <ConversationModule
                onAddXp={handleAddXp}
                completedDialogues={stats.completedDialogues || []}
                onToggleCompleteDialogue={handleToggleCompleteDialogue}
              />
            )}

            {currentModule === 'culture' && (
              <CultureModule onAddXp={handleAddXp} />
            )}

            {currentModule === 'practice' && (
              <PracticeHub stats={stats} onAddXp={handleAddXp} />
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-arabic text-base text-emerald-600 font-bold" dir="rtl">
            فَصَاحَة • تَعَلَّمِ اللُّغَةَ العَرَبِيَّةَ بِإِتْقَانٍ
          </p>
          <p>
            Fasaha Arabic Learning Suite • Structured on Core Pedagogical Steps for Authentic Arabic Literacy.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
