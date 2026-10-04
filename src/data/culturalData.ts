import { CalligraphyStyle, DialectComparison, ProverbItem } from '../types';

export const PROVERBS_DATA: ProverbItem[] = [
  {
    id: 'prov-1',
    arabic: 'مَنْ جَدَّ وَجَدَ، وَمَنْ زَرَعَ حَصَدَ',
    transliteration: 'Man jadda wajada, wa man zara‘a ḥaṣad',
    literalEnglish: 'Whoever strives diligently finds success, and whoever sows reaps the harvest.',
    englishMeaning: 'Hard work and persistence yield rewards (You reap what you sow).',
    culturalContext: 'Taught to school children throughout the Arab world to inspire diligence and dedication.',
    theme: 'Perseverance & Diligence'
  },
  {
    id: 'prov-2',
    arabic: 'الصَّبْرُ مِفْتَاحُ الفَرَجِ',
    transliteration: 'Aṣ-ṣabru miftāḥul-faraj',
    literalEnglish: 'Patience is the key to relief / liberation.',
    englishMeaning: 'With patience comes solace and overcoming hardship.',
    culturalContext: 'A cornerstone virtue in Arabic culture, poetry, and Islamic philosophy.',
    theme: 'Patience & Resilience'
  },
  {
    id: 'prov-3',
    arabic: 'اُطْلُبُوا العِلْمَ مِنَ المَهْدِ إِلَى اللَّحْدِ',
    transliteration: 'Uṭlubul-‘ilma minal-mahdi ilal-laḥd',
    literalEnglish: 'Seek knowledge from the cradle to the grave.',
    englishMeaning: 'Lifelong learning and continuous curiosity are paramount virtues.',
    culturalContext: 'Reflects the deep historical reverence for scholarship, astronomy, medicine, and philosophy in the Golden Age.',
    theme: 'Lifelong Learning'
  },
  {
    id: 'prov-4',
    arabic: 'رُبَّ أَخٍ لَكَ لَمْ تَلِدْهُ أُمُّكَ',
    transliteration: 'Rubba akhin laka lam talidh-hu ummuk',
    literalEnglish: 'Many a true brother you have who was not born by your mother.',
    englishMeaning: 'True loyal friends are like family.',
    culturalContext: 'Honoring deep friendship and tribal / communal solidarity in Arabic heritage.',
    theme: 'Friendship & Loyalty'
  },
  {
    id: 'prov-5',
    arabic: 'اليَدُ الوَاحِدَةُ لاَ تُصَفِّقُ',
    transliteration: 'Al-yadu-l-wāḥidatu lā tuṣaffiq',
    literalEnglish: 'A single hand cannot clap alone.',
    englishMeaning: 'Teamwork, cooperation, and unity are essential for achievement.',
    culturalContext: 'Emphasizes community solidarity over hyper-individualism.',
    theme: 'Unity & Cooperation'
  }
];

export const CALLIGRAPHY_STYLES: CalligraphyStyle[] = [
  {
    id: 'naskh',
    nameEn: 'Naskh (النَّسْخ)',
    nameAr: 'خَطُّ النَّسْخِ',
    originEra: '10th Century CE (Abbasid Baghdad)',
    characteristics: ['Clear and highly readable proportions', 'Rounded flowing strokes', 'Standard font of printed books and Quran copies'],
    sampleText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    usage: 'Standard print, Quranic texts, textbooks, and signage.',
    fontClass: 'font-arabic',
    description: 'Naskh means "to transcribe". It was standardized by the great vizier and calligrapher Ibn Muqla to replace older angular scripts with a legible, balanced cursive.'
  },
  {
    id: 'thuluth',
    nameEn: 'Thuluth (الثُّلُث)',
    nameAr: 'خَطُّ الثُّلُثِ',
    originEra: '7th–10th Century CE',
    characteristics: ['Monumental, majestic curves', 'Letters intertwine dynamically with tall vertical ascenders', 'Highly decorative and artistic'],
    sampleText: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    usage: 'Mosque architecture, domes, monumental inscriptions, title headers.',
    fontClass: 'font-arabic text-4xl font-bold',
    description: 'Known as the "King of Arabic Scripts", Thuluth (meaning "one-third") refers to the pen nib angle. It requires master precision and is used for monumental inscriptions.'
  },
  {
    id: 'diwani',
    nameEn: 'Diwani (الدِّيوَانِي)',
    nameAr: 'الخَطُّ الدِّيوَانِيُّ',
    originEra: '16th Century CE (Ottoman Imperial Chancery)',
    characteristics: ['Extreme fluidity and graceful swooping curves', 'Letters dance closely together', 'Often encrypted or difficult for untrained eyes to read'],
    sampleText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    usage: 'Royal decrees, ceremonial diplomas, luxury invitations, fine art.',
    fontClass: 'font-ruqaa text-3xl font-semibold',
    description: 'Developed in the Ottoman imperial court (Diwan), this script combined royal elegance with security—its intertwined structure prevented forgery in state documents.'
  },
  {
    id: 'ruqah',
    nameEn: 'Ruq‘ah (الرُّقْعَة)',
    nameAr: 'خَطُّ الرُّقْعَةِ',
    originEra: '19th Century CE',
    characteristics: ['Compact, short straight strokes', 'Minimal flourishes, quick to write by hand', 'Dots are often merged into continuous lines'],
    sampleText: 'العِلْمُ نُورٌ وَالجَهْلُ ظَلاَمٌ',
    usage: 'Everyday handwriting, chalkboards, quick personal notes.',
    fontClass: 'font-ruqaa text-2xl',
    description: 'The most popular modern handwriting script across the Arab world. Designed for speed, simplicity, and efficiency on paper.'
  },
  {
    id: 'kufic',
    nameEn: 'Kufic (الكُوفِي)',
    nameAr: 'الخَطُّ الكُوفِيُّ',
    originEra: '7th Century CE (Kufa, Iraq)',
    characteristics: ['Geometric, angular structure', 'Horizontal baseline with bold vertical strokes', 'Earliest formal Quranic script'],
    sampleText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    usage: 'Early Islamic manuscripts, stone carvings, modern architectural logos.',
    fontClass: 'font-arabic font-extrabold tracking-widest',
    description: 'The oldest Arabic calligraphic script, originating in Kufa. Its bold geometric precision makes it a favorite for architectural friezes and modern Arabic logo typography.'
  }
];

export const DIALECT_COMPARISONS: DialectComparison[] = [
  {
    id: 'dial-1',
    meaningEn: 'How are you?',
    msa: { arabic: 'كَيْفَ حَالُكَ؟', translit: 'Kayfa ḥāluk?' },
    egyptian: { arabic: 'عَامِل إِيه؟ / إِزَّيَّك؟', translit: '‘Āmil ēh? / Izzayyak?', note: 'Very common throughout Egyptian media' },
    levantine: { arabic: 'كِيفَك؟ / شُو أَخْبَارَك؟', translit: 'Kīfak? / Shū akhbārak?', note: 'Used in Lebanon, Syria, Jordan, Palestine' },
    gulf: { arabic: 'شْلُونَك؟ / كَيْفَ الحَال؟', translit: 'Shlōnak? / Kayf al-ḥāl?', note: 'Used across UAE, Saudi, Kuwait, Qatar' },
    moroccan: { arabic: 'كِيدَايْر؟ / لَابَاسْ؟', translit: 'Kī dāyer? / Lā bās?', note: 'Darija unique phrasing' }
  },
  {
    id: 'dial-2',
    meaningEn: 'What do you want?',
    msa: { arabic: 'مَاذَا تُرِيدُ؟', translit: 'Mādhā turīd?' },
    egyptian: { arabic: 'عَايِز إِيه؟', translit: '‘Āyiz ēh?' },
    levantine: { arabic: 'شُو بَدَّك؟', translit: 'Shū baddak?' },
    gulf: { arabic: 'شُو تِبْغَى؟ / شِتَبِي؟', translit: 'Shū tibgha? / Shitabi?' },
    moroccan: { arabic: 'شْنُو بْغِيتِي؟', translit: 'Shnū bghītī?' }
  },
  {
    id: 'dial-3',
    meaningEn: 'A lot / Very much',
    msa: { arabic: 'كَثِيرًا / جِدًّا', translit: 'Kathīran / Jiddan' },
    egyptian: { arabic: 'أَوِي / كِتِير', translit: 'Awy / Kitīr' },
    levantine: { arabic: 'كْتِير', translit: 'Ktīr' },
    gulf: { arabic: 'وَايِدْ / كِثِير', translit: 'Wāyid / Kithīr' },
    moroccan: { arabic: 'بْزَّافْ', translit: 'Bezzāf' }
  },
  {
    id: 'dial-4',
    meaningEn: 'Now',
    msa: { arabic: 'الآنَ', translit: 'Al-’ān' },
    egyptian: { arabic: 'دِلْوَقْتِي', translit: 'Dilwa’ti' },
    levantine: { arabic: 'هَلَّقْ / هَلَّأ', translit: 'Halla’' },
    gulf: { arabic: 'الحِينْ', translit: 'Al-ḥīn' },
    moroccan: { arabic: 'دَابَا', translit: 'Dābā' }
  }
];
