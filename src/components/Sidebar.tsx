import React from 'react';
import { BookOpen, Layers, PenTool, Cpu, MessageSquare, Globe2, Trophy } from 'lucide-react';
import { ModuleType, UserStats } from '../types';

interface SidebarProps {
  currentModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  stats: UserStats;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  stats,
}) => {
  const steps = [
    {
      id: 'alphabet' as ModuleType,
      stepNum: '1',
      titleEn: 'Alphabet & Phonetics',
      titleAr: 'الأبجدية والأصوات',
      icon: BookOpen,
      color: 'emerald',
      progress: `${(stats.completedLetters || []).length}/28 Letters`,
    },
    {
      id: 'vocabulary' as ModuleType,
      stepNum: '2',
      titleEn: 'Build Vocabulary',
      titleAr: 'المفردات والقواميس',
      icon: Layers,
      color: 'blue',
      progress: `${(stats.masteredVocab || []).length} Mastered`,
    },
    {
      id: 'reading_writing' as ModuleType,
      stepNum: '3',
      titleEn: 'Reading & Writing',
      titleAr: 'القراءة والكتابة',
      icon: PenTool,
      color: 'teal',
      progress: `${(stats.completedReading || []).length} Stories`,
    },
    {
      id: 'morphology' as ModuleType,
      stepNum: '4',
      titleEn: 'Root & Pattern Lab',
      titleAr: 'علم الصرف والميزان',
      icon: Cpu,
      color: 'violet',
      progress: 'Awzān & Roots',
    },
    {
      id: 'grammar' as ModuleType,
      stepNum: '5',
      titleEn: 'Grammar Engine',
      titleAr: 'قواعد اللغة',
      icon: Layers,
      color: 'purple',
      progress: `${(stats.completedGrammar || []).length}/8 Lessons`,
    },
    {
      id: 'conversation' as ModuleType,
      stepNum: '6',
      titleEn: 'Conversational Studio',
      titleAr: 'المحادثة والنطق',
      icon: MessageSquare,
      color: 'cyan',
      progress: `${(stats.completedDialogues || []).length} Dialogues`,
    },
    {
      id: 'culture' as ModuleType,
      stepNum: '7',
      titleEn: 'Cultural Immersion',
      titleAr: 'الثقافة والحكمة',
      icon: Globe2,
      color: 'amber',
      progress: 'Proverbs & Calligraphy',
    },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* Roadmap Navigation Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-2">
        <div className="px-2 py-1 mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            6-Step Learning Path
          </span>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Curriculum Roadmap
          </h3>
        </div>

        <div className="space-y-1.5">
          {steps.map((s) => {
            const isActive = currentModule === s.id;
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectModule(s.id)}
                className={`w-full p-3 rounded-2xl text-left transition flex items-center justify-between group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200'
                    }`}
                  >
                    {s.stepNum}
                  </div>
                  <div className="leading-tight">
                    <h4 className="font-bold text-xs">{s.titleEn}</h4>
                    <p className={`font-arabic text-xs mt-0.5 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} dir="rtl">
                      {s.titleAr}
                    </p>
                  </div>
                </div>

                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Practice Hub Link */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-3">
          <button
            type="button"
            onClick={() => onSelectModule('practice')}
            className={`w-full p-3 rounded-2xl text-left transition flex items-center justify-between font-bold text-xs ${
              currentModule === 'practice'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Mastery Challenges</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-full">
              Quiz & Badges
            </span>
          </button>
        </div>
      </div>

      {/* Daily Motivation Widget */}
      <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 rounded-3xl space-y-2 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          💡 Daily Learning Wisdom
        </span>
        <p className="font-arabic text-sm font-bold text-slate-800 dark:text-slate-200 text-right" dir="rtl">
          «مَنْ جَدَّ وَجَدَ، وَمَنْ زَرَعَ حَصَدَ»
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-[11px] italic">
          "Whoever strives diligently finds success, and whoever sows reaps."
        </p>
      </div>
    </aside>
  );
};
