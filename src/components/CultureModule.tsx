import React, { useState } from 'react';
import { Compass, Globe2, Feather, Heart } from 'lucide-react';
import { PROVERBS_DATA, CALLIGRAPHY_STYLES, DIALECT_COMPARISONS } from '../data/culturalData';
import { CalligraphyStyle } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import { arabicAudio } from '../utils/audio';

interface CultureModuleProps {
  onAddXp: (amount: number) => void;
}

export const CultureModule: React.FC<CultureModuleProps> = ({ onAddXp }) => {
  const [activeTab, setActiveTab] = useState<'proverbs' | 'calligraphy' | 'dialects'>('proverbs');
  const [selectedStyle, setSelectedStyle] = useState<CalligraphyStyle>(CALLIGRAPHY_STYLES[0]);
  const [calligraphyPreviewText, setCalligraphyPreviewText] = useState('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-yellow-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <span className="font-arabic text-9xl font-bold">ثقافة</span>
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-800/80 text-amber-200 text-xs font-semibold rounded-full uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" /> Step 6: Cultural Immersion
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Cultural Immersion & Wisdom (الثَّقَافَةُ وَالحِكْمَةُ العَرَبِيَّةُ)
          </h2>
          <p className="text-amber-100/90 text-sm md:text-base leading-relaxed">
            Language is the gateway to culture. Explore timeless Arabic proverbs, discover the majestic art of Islamic calligraphy, and navigate regional dialects vs Modern Standard Arabic (Fusha).
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('proverbs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'proverbs'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-amber-950/40 text-amber-100 hover:bg-amber-950/70'
              }`}
            >
              <Heart className="w-4 h-4" /> Proverbs & Wisdom (الأمثال)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calligraphy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'calligraphy'
                  ? 'bg-white text-amber-950 shadow-md'
                  : 'bg-amber-950/40 text-amber-100 hover:bg-amber-950/70'
              }`}
            >
              <Feather className="w-4 h-4" /> Calligraphy Styles (فنون الخط)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dialects')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'dialects'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'bg-amber-950/40 text-amber-100 hover:bg-amber-950/70'
              }`}
            >
              <Compass className="w-4 h-4" /> Dialect Compass (اللهجات)
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: PROVERBS & WISDOM */}
      {activeTab === 'proverbs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROVERBS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-amber-400 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full">
                      {item.theme}
                    </span>
                    <AudioPlayerButton text={item.arabic} size="sm" variant="ghost" />
                  </div>

                  <p className="font-arabic text-3xl font-bold text-slate-900 dark:text-white leading-relaxed text-right" dir="rtl">
                    «{item.arabic}»
                  </p>

                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-amber-700 dark:text-amber-400">
                      {item.transliteration}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong>Meaning:</strong> {item.englishMeaning}
                    </p>
                    <p className="text-slate-500 italic">
                      Literal: "{item.literalEnglish}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 bg-amber-50/50 dark:bg-slate-800/50 p-3 rounded-2xl">
                  <strong>Cultural Context:</strong> {item.culturalContext}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CALLIGRAPHY SHOWCASE */}
      {activeTab === 'calligraphy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Style Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Major Calligraphy Traditions
            </h3>
            {CALLIGRAPHY_STYLES.map((style) => {
              const isSelected = selectedStyle.id === style.id;

              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    arabicAudio.playChime('click');
                    setSelectedStyle(style);
                    setCalligraphyPreviewText(style.sampleText);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition ${
                    isSelected
                      ? 'bg-amber-700 text-white border-amber-600 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{style.nameEn}</span>
                    <span className="text-[10px] opacity-80">{style.originEra}</span>
                  </div>
                  <p className="font-arabic text-lg font-bold opacity-90" dir="rtl">
                    {style.nameAr}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Style Detail & Live Canvas (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedStyle.nameEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Origin: {selectedStyle.originEra} • Usage: {selectedStyle.usage}
                </p>
              </div>

              {/* Big Calligraphic Display Panel */}
              <div className="bg-amber-50/70 dark:bg-slate-950 p-8 rounded-3xl border border-amber-200 dark:border-amber-900/40 text-center space-y-4">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  Authentic Rendering ({selectedStyle.nameEn})
                </span>
                <div
                  className={`my-6 text-slate-900 dark:text-amber-100 ${selectedStyle.fontClass}`}
                  dir="rtl"
                >
                  {calligraphyPreviewText}
                </div>
                <AudioPlayerButton text={calligraphyPreviewText} variant="primary" size="sm" label="Pronounce Text" />
              </div>

              {/* History & Characteristics */}
              <div className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedStyle.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Characteristics:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {selectedStyle.characteristics.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIALECT COMPASS */}
      {activeTab === 'dialects' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Modern Standard Arabic (MSA / الفصحى) vs Regional Dialects (العاميات)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Fusha is the universal written standard taught in schools and media from Morocco to Oman. In daily informal speech, Arabs use regional dialects. Compare how common phrases translate across regions:
            </p>

            <div className="space-y-4 mt-4">
              {DIALECT_COMPARISONS.map((d) => (
                <div
                  key={d.id}
                  className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Phrase: "{d.meaningEn}"
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600 font-arabic" dir="rtl">
                        الفصحى: {d.msa.arabic}
                      </span>
                      <AudioPlayerButton text={d.msa.arabic} size="sm" variant="ghost" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                    {/* Egyptian */}
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">🇪🇬 Egyptian (مصر)</span>
                      <p className="font-arabic text-xl font-bold text-slate-800 dark:text-slate-100" dir="rtl">{d.egyptian.arabic}</p>
                      <span className="text-[10px] text-slate-400 block">{d.egyptian.translit}</span>
                    </div>

                    {/* Levantine */}
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">🇱🇧 Levantine (الشام)</span>
                      <p className="font-arabic text-xl font-bold text-slate-800 dark:text-slate-100" dir="rtl">{d.levantine.arabic}</p>
                      <span className="text-[10px] text-slate-400 block">{d.levantine.translit}</span>
                    </div>

                    {/* Gulf */}
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">🇸🇦 Gulf (الخليج)</span>
                      <p className="font-arabic text-xl font-bold text-slate-800 dark:text-slate-100" dir="rtl">{d.gulf.arabic}</p>
                      <span className="text-[10px] text-slate-400 block">{d.gulf.translit}</span>
                    </div>

                    {/* Moroccan */}
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">🇲🇦 Moroccan (المغرب)</span>
                      <p className="font-arabic text-xl font-bold text-slate-800 dark:text-slate-100" dir="rtl">{d.moroccan.arabic}</p>
                      <span className="text-[10px] text-slate-400 block">{d.moroccan.translit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
