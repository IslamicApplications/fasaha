import React, { useState } from 'react';
import { Flame, Zap, Moon, Sun, ScrollText, Music, Volume2 } from 'lucide-react';
import { UserStats } from '../types';
import { arabicAudio } from '../utils/audio';

interface NavbarProps {
  stats: UserStats;
  theme: 'light' | 'dark' | 'parchment';
  onToggleTheme: () => void;
  onSelectPractice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  theme,
  onToggleTheme,
  onSelectPractice,
}) => {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  const handleToggleAmbient = () => {
    const active = arabicAudio.toggleAmbientSoundscape();
    setIsAmbientPlaying(active);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <span className="font-arabic text-2xl font-bold">ف</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Fasaha <span className="font-arabic text-emerald-600 font-bold">(فَصَاحَة)</span>
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-full uppercase">
                Arabic Mastery Suite
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
              Reading • Writing • Morphology • Conversation
            </p>
          </div>
        </div>

        {/* Center/Right: Soundscape, Streak, XP, Theme switcher, Practice button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Maqam Drone Button */}
          <button
            type="button"
            onClick={handleToggleAmbient}
            title={isAmbientPlaying ? 'Mute Ambient Study Drone' : 'Play Ambient Maqam Drone'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition border ${
              isAmbientPlaying
                ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30 animate-pulse'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAmbientPlaying ? 'Maqam: Playing' : 'Study Ambience'}</span>
          </button>

          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 rounded-xl text-orange-700 dark:text-orange-400 font-bold text-xs shadow-sm">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{stats.streak}d Streak</span>
          </div>

          {/* XP Counter */}
          <button
            type="button"
            onClick={onSelectPractice}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-700 dark:text-amber-400 font-bold text-xs shadow-sm hover:scale-105 transition"
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{stats.xp} XP</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : theme === 'parchment' ? (
              <ScrollText className="w-4 h-4 text-amber-700" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
