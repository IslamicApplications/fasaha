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
        return JSON.parse(saved);
      } catch {
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });

  // Persist stats in localStorage
  useEffect(() => {
    localStorage.setItem('fasaha_stats', JSON.stringify(stats));
  }, [stats]);

  // Handle Theme switching & root class manipulation
  useEffect(() => {
    localStorage.setItem('fasaha_theme', theme);
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
      xp: prev.xp + amount,
    }));
  };

  const handleToggleCompleteLetter = (id: number) => {
    setStats((prev) => {
      const exists = prev.completedLetters.includes(id);
      return {
        ...prev,
        completedLetters: exists
          ? prev.completedLetters.filter((l) => l !== id)
          : [...prev.completedLetters, id],
      };
    });
  };

  const handleToggleMasterVocab = (id: string) => {
    setStats((prev) => {
      const exists = prev.masteredVocab.includes(id);
      return {
        ...prev,
        masteredVocab: exists
          ? prev.masteredVocab.filter((v) => v !== id)
          : [...prev.masteredVocab, id],
      };
    });
  };

  const handleToggleBookmarkVocab = (id: string) => {
    setStats((prev) => {
      const exists = prev.bookmarkedVocab.includes(id);
      return {
        ...prev,
        bookmarkedVocab: exists
          ? prev.bookmarkedVocab.filter((v) => v !== id)
          : [...prev.bookmarkedVocab, id],
      };
    });
  };

  const handleToggleCompleteReading = (id: string) => {
    setStats((prev) => {
      if (prev.completedReading.includes(id)) return prev;
      return {
        ...prev,
        completedReading: [...prev.completedReading, id],
      };
    });
  };

  const handleToggleCompleteGrammar = (id: string) => {
    setStats((prev) => {
      if (prev.completedGrammar.includes(id)) return prev;
      return {
        ...prev,
        completedGrammar: [...prev.completedGrammar, id],
      };
    });
  };

  const handleToggleCompleteDialogue = (id: string) => {
    setStats((prev) => {
      if (prev.completedDialogues.includes(id)) return prev;
      return {
        ...prev,
        completedDialogues: [...prev.completedDialogues, id],
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
          {/* Sidebar with 6 Pedagogical Steps */}
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
                completedLetters={stats.completedLetters}
                onToggleCompleteLetter={handleToggleCompleteLetter}
              />
            )}

            {currentModule === 'vocabulary' && (
              <VocabularyModule
                onAddXp={handleAddXp}
                masteredVocab={stats.masteredVocab}
                bookmarkedVocab={stats.bookmarkedVocab}
                onToggleMaster={handleToggleMasterVocab}
                onToggleBookmark={handleToggleBookmarkVocab}
              />
            )}

            {currentModule === 'reading_writing' && (
              <ReadingWritingModule
                onAddXp={handleAddXp}
                completedReading={stats.completedReading}
                onToggleCompleteReading={handleToggleCompleteReading}
              />
            )}

            {currentModule === 'morphology' && (
              <MorphologyLab onAddXp={handleAddXp} />
            )}

            {currentModule === 'grammar' && (
              <GrammarModule
                onAddXp={handleAddXp}
                completedGrammar={stats.completedGrammar}
                onToggleCompleteGrammar={handleToggleCompleteGrammar}
              />
            )}

            {currentModule === 'conversation' && (
              <ConversationModule
                onAddXp={handleAddXp}
                completedDialogues={stats.completedDialogues}
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
            Fasaha Arabic Learning Suite • Structured on 6 Pedagogical Steps for Authentic Arabic Literacy.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
