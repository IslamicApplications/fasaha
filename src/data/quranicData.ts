export interface QuranicWordToken {
  arabic: string;
  transliteration: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'particle';
  root?: string;
  grammarDetail?: string;
}

export interface QuranicVerse {
  ayahNumber: number;
  arabic: string;
  transliteration: string;
  english: string;
  audioUrl?: string;
  words: QuranicWordToken[];
}

export interface QuranicText {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'quran' | 'poetry';
  authorOrSource: string;
  totalVerses: number;
  verses: QuranicVerse[];
}

export const QURANIC_TEXTS: QuranicText[] = [
  {
    id: 'al-fatiha',
    titleAr: 'سُورَةُ الفَاتِحَةِ',
    titleEn: 'Surah Al-Fātiḥah (The Opening)',
    category: 'quran',
    authorOrSource: 'The Holy Qur’an (Chapter 1)',
    totalVerses: 7,
    verses: [
      {
        ayahNumber: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
        english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
        words: [
          { arabic: 'بِـ', transliteration: 'Bi', english: 'In / With', partOfSpeech: 'particle', grammarDetail: 'Preposition of accompaniment' },
          { arabic: 'اسْمِ', transliteration: 'Ism', english: 'name', partOfSpeech: 'noun', root: 'س - م - و' },
          { arabic: 'اللَّهِ', transliteration: 'Allāh', english: 'Allah', partOfSpeech: 'noun', grammarDetail: 'Proper name of the Divine' },
          { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Raḥmān', english: 'The Entirely Merciful', partOfSpeech: 'noun', root: 'ر - ح - م' },
          { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raḥīm', english: 'The Especially Merciful', partOfSpeech: 'noun', root: 'ر - ح - م' }
        ]
      },
      {
        ayahNumber: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Al-ḥamdu lillāhi Rabbil-‘ālamīn',
        english: '[All] praise is [due] to Allah, Lord of the worlds.',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
        words: [
          { arabic: 'الْحَمْدُ', transliteration: 'Al-ḥamd', english: 'All praise', partOfSpeech: 'noun', root: 'ح - م - د' },
          { arabic: 'لِـ', transliteration: 'Li', english: 'to / for', partOfSpeech: 'particle' },
          { arabic: 'اللَّهِ', transliteration: 'Allāh', english: 'Allah', partOfSpeech: 'noun' },
          { arabic: 'رَبِّ', transliteration: 'Rabb', english: 'Lord / Cherisher', partOfSpeech: 'noun', root: 'ر - ب - ب' },
          { arabic: 'الْعَالَمِينَ', transliteration: 'Al-‘ālamīn', english: 'of all creation/worlds', partOfSpeech: 'noun', root: 'ع - ل - م' }
        ]
      },
      {
        ayahNumber: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-Raḥmānir-Raḥīm',
        english: 'The Entirely Merciful, the Especially Merciful,',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3',
        words: [
          { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Raḥmān', english: 'The Entirely Merciful', partOfSpeech: 'noun', root: 'ر - ح - م' },
          { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raḥīm', english: 'The Especially Merciful', partOfSpeech: 'noun', root: 'ر - ح - م' }
        ]
      },
      {
        ayahNumber: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Māliki yawmid-dīn',
        english: 'Sovereign of the Day of Recompense.',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3',
        words: [
          { arabic: 'مَالِكِ', transliteration: 'Mālik', english: 'Master / Sovereign', partOfSpeech: 'noun', root: 'م - ل - ك' },
          { arabic: 'يَوْمِ', transliteration: 'Yawm', english: 'Day', partOfSpeech: 'noun', root: 'ي - و - م' },
          { arabic: 'الدِّينِ', transliteration: 'Ad-dīn', english: 'Judgment / Religion', partOfSpeech: 'noun', root: 'د - ي - ن' }
        ]
      },
      {
        ayahNumber: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyāka na‘budu wa iyyāka nasta‘īn',
        english: 'It is You we worship and You we ask for help.',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3',
        words: [
          { arabic: 'إِيَّاكَ', transliteration: 'Iyyāka', english: 'You alone', partOfSpeech: 'noun', grammarDetail: 'Exclusive direct object' },
          { arabic: 'نَعْبُدُ', transliteration: 'Na‘budu', english: 'we worship', partOfSpeech: 'verb', root: 'ع - ب - د' },
          { arabic: 'وَ', transliteration: 'Wa', english: 'and', partOfSpeech: 'particle' },
          { arabic: 'إِيَّاكَ', transliteration: 'Iyyāka', english: 'You alone', partOfSpeech: 'noun' },
          { arabic: 'نَسْتَعِينُ', transliteration: 'Nasta‘īn', english: 'we ask for help', partOfSpeech: 'verb', root: 'ع - و - ن' }
        ]
      },
      {
        ayahNumber: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
        english: 'Guide us to the straight path -',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3',
        words: [
          { arabic: 'اهْدِ', transliteration: 'Ihdī', english: 'Guide', partOfSpeech: 'verb', root: 'ه - د - ي' },
          { arabic: 'ـنَا', transliteration: 'Nā', english: 'us', partOfSpeech: 'noun' },
          { arabic: 'الصِّرَاطَ', transliteration: 'Aṣ-ṣirāṭ', english: 'the path', partOfSpeech: 'noun' },
          { arabic: 'الْمُسْتَقِيمَ', transliteration: 'Al-mustaqīm', english: 'the straight / upright', partOfSpeech: 'noun', root: 'ق - و - م' }
        ]
      },
      {
        ayahNumber: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Ṣirāṭal-ladhīna an‘amta ‘alayhim ghayril-maghḍūbi ‘alayhim walad-ḍāllīn',
        english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3',
        words: [
          { arabic: 'صِرَاطَ', transliteration: 'Ṣirāṭ', english: 'The path', partOfSpeech: 'noun' },
          { arabic: 'الَّذِينَ', transliteration: 'Al-ladhīna', english: 'of those who', partOfSpeech: 'noun' },
          { arabic: 'أَنْعَمْتَ', transliteration: 'An‘amta', english: 'You bestowed favor', partOfSpeech: 'verb', root: 'ن - ع - م' },
          { arabic: 'عَلَيْهِمْ', transliteration: '‘Alayhim', english: 'upon them', partOfSpeech: 'particle' },
          { arabic: 'غَيْرِ', transliteration: 'Ghayri', english: 'not', partOfSpeech: 'noun' },
          { arabic: 'الْمَغْضُوبِ', transliteration: 'Al-maghḍūb', english: 'those who evoked anger', partOfSpeech: 'noun', root: 'غ - ض - ب' },
          { arabic: 'وَلَا', transliteration: 'Wa lā', english: 'and nor', partOfSpeech: 'particle' },
          { arabic: 'الضَّالِّينَ', transliteration: 'Aḍ-ḍāllīn', english: 'those who are astray', partOfSpeech: 'noun', root: 'ض - ل - ل' }
        ]
      }
    ]
  },
  {
    id: 'al-ikhlas',
    titleAr: 'سُورَةُ الإِخْلاَصِ',
    titleEn: 'Surah Al-Ikhlāṣ (The Sincerity / Purity)',
    category: 'quran',
    authorOrSource: 'The Holy Qur’an (Chapter 112)',
    totalVerses: 4,
    verses: [
      {
        ayahNumber: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul Huwallāhu Aḥad',
        english: 'Say, "He is Allah, [who is] One,',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3',
        words: [
          { arabic: 'قُلْ', transliteration: 'Qul', english: 'Say (command)', partOfSpeech: 'verb', root: 'ق - و - ل' },
          { arabic: 'هُوَ', transliteration: 'Huwa', english: 'He', partOfSpeech: 'noun' },
          { arabic: 'اللَّهُ', transliteration: 'Allāh', english: 'Allah', partOfSpeech: 'noun' },
          { arabic: 'أَحَدٌ', transliteration: 'Aḥad', english: 'The One / Indivisible', partOfSpeech: 'noun', root: 'و - ح - د' }
        ]
      },
      {
        ayahNumber: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allāhuṣ-Ṣamad',
        english: 'Allah, the Eternal Refuge.',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3',
        words: [
          { arabic: 'اللَّهُ', transliteration: 'Allāh', english: 'Allah', partOfSpeech: 'noun' },
          { arabic: 'الصَّمَدُ', transliteration: 'Aṣ-ṣamad', english: 'The Eternal / Self-Sufficient', partOfSpeech: 'noun', root: 'ص - م - د' }
        ]
      },
      {
        ayahNumber: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa lam yūlad',
        english: 'He neither begets nor is born,',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3',
        words: [
          { arabic: 'لَمْ', transliteration: 'Lam', english: 'Did not (negation)', partOfSpeech: 'particle' },
          { arabic: 'يَلِدْ', transliteration: 'Yalid', english: 'beget', partOfSpeech: 'verb', root: 'و - ل - د' },
          { arabic: 'وَ', transliteration: 'Wa', english: 'and', partOfSpeech: 'particle' },
          { arabic: 'لَمْ', transliteration: 'Lam', english: 'not', partOfSpeech: 'particle' },
          { arabic: 'يُولَدْ', transliteration: 'Yūlad', english: 'is born (passive)', partOfSpeech: 'verb', root: 'و - ل - د' }
        ]
      },
      {
        ayahNumber: 4,
        arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        transliteration: 'Wa lam yakun lahū kufuwan aḥad',
        english: 'Nor is there to Him any equivalent."',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3',
        words: [
          { arabic: 'وَلَمْ', transliteration: 'Wa lam', english: 'And not', partOfSpeech: 'particle' },
          { arabic: 'يَكُنْ', transliteration: 'Yakun', english: 'there is', partOfSpeech: 'verb', root: 'ك - و - ن' },
          { arabic: 'لَهُ', transliteration: 'Lahū', english: 'unto Him', partOfSpeech: 'noun' },
          { arabic: 'كُفُوًا', transliteration: 'Kufuwan', english: 'equal / equivalent', partOfSpeech: 'noun', root: 'ك - ف - أ' },
          { arabic: 'أَحَدٌ', transliteration: 'Aḥad', english: 'anyone', partOfSpeech: 'noun' }
        ]
      }
    ]
  },
  {
    id: 'poetry-shafii',
    titleAr: 'دَعِ الأَيَّامَ تَفْعَلُ مَا تَشَاءُ',
    titleEn: 'Let Days Bring What They Will (Wisdom Ode)',
    category: 'poetry',
    authorOrSource: 'Imam Al-Shafi‘i (767–820 CE)',
    totalVerses: 3,
    verses: [
      {
        ayahNumber: 1,
        arabic: 'دَعِ الأَيَّامَ تَفْعَلُ مَا تَشَاءُ ... وَطِبْ نَفْسًا إِذَا حَكَمَ القَضَاءُ',
        transliteration: 'Da‘il-ayyāma taf‘alu mā tashā’ ... wa ṭib nafsan idhā ḥakamal-qaḍā’',
        english: 'Let the days do whatever they will, and be at peace of soul when destiny decrees.',
        words: [
          { arabic: 'دَعِ', transliteration: 'Da‘', english: 'Leave / Let', partOfSpeech: 'verb', root: 'و - د - ع' },
          { arabic: 'الأَيَّامَ', transliteration: 'Al-ayyām', english: 'the days', partOfSpeech: 'noun', root: 'ي - و - م' },
          { arabic: 'تَفْعَلُ', transliteration: 'Taf‘alu', english: 'they do', partOfSpeech: 'verb', root: 'ف - ع - ل' },
          { arabic: 'مَا تَشَاءُ', transliteration: 'Mā tashā’', english: 'what they wish', partOfSpeech: 'verb', root: 'ش - ي - أ' }
        ]
      },
      {
        ayahNumber: 2,
        arabic: 'وَلاَ تَجْزَعْ لِحَادِثَةِ اللَّيَالِي ... فَمَا لِحَوَادِثِ الدُّنْيَا بَقَاءُ',
        transliteration: 'Wa lā tajza‘ liḥādithatil-layālī ... famā liḥawādithid-dunyā baqā’',
        english: 'And do not despair over the events of the nights, for the tribulations of this world do not last forever.',
        words: [
          { arabic: 'وَلاَ', transliteration: 'Wa lā', english: 'And do not', partOfSpeech: 'particle' },
          { arabic: 'تَجْزَعْ', transliteration: 'Tajza‘', english: 'despair / grieve', partOfSpeech: 'verb', root: 'ج - ز - ع' },
          { arabic: 'بَقَاءُ', transliteration: 'Baqā’', english: 'permanence / eternity', partOfSpeech: 'noun', root: 'ب - ق - ي' }
        ]
      }
    ]
  }
];
