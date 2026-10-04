import { ReadingPassage } from '../types';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'reading-1',
    titleAr: 'يَوْمٌ جَمِيلٌ فِي الحَدِيقَةِ',
    titleEn: 'A Beautiful Day in the Garden',
    level: 'beginner',
    category: 'Daily Life',
    summary: 'A simple beginner passage practicing basic nominal sentences, colors, and nature words.',
    culturalNote: 'Gardens (Hada’iq) have historically held a special place in Arabic culture and poetry, symbolizing peace and beauty.',
    sentences: [
      {
        id: 1,
        arabic: 'الشَّمْسُ مُشْرِقَةٌ وَالسَّمَاءُ صَافِيَةٌ.',
        transliteration: 'Ash-shamsu mushriqatun was-samā’u ṣāfiyah.',
        english: 'The sun is shining and the sky is clear.',
        words: [
          { arabic: 'الشَّمْسُ', transliteration: 'Ash-shams', english: 'The sun', grammarNote: 'Sun letter (Sh)' },
          { arabic: 'مُشْرِقَةٌ', transliteration: 'mushriqah', english: 'shining (f)', grammarNote: 'Feminine adjective' },
          { arabic: 'وَ', transliteration: 'wa', english: 'and', grammarNote: 'Conjunction particle' },
          { arabic: 'السَّمَاءُ', transliteration: 'as-samā’', english: 'the sky', grammarNote: 'Definite noun' },
          { arabic: 'صَافِيَةٌ', transliteration: 'ṣāfiyah', english: 'clear / pure', grammarNote: 'Adjective' }
        ]
      },
      {
        id: 2,
        arabic: 'فِي الحَدِيقَةِ أَزْهَارٌ حَمْرَاءُ وَصَفْرَاءُ.',
        transliteration: 'Fīl-ḥadīqati azhārun ḥamrā’u wa ṣafrā’.',
        english: 'In the garden, there are red and yellow flowers.',
        words: [
          { arabic: 'فِي', transliteration: 'fī', english: 'in', grammarNote: 'Preposition (حرف جر)' },
          { arabic: 'الحَدِيقَةِ', transliteration: 'al-ḥadīqah', english: 'the garden', grammarNote: 'Genitive case with Kasra' },
          { arabic: 'أَزْهَارٌ', transliteration: 'azhār', english: 'flowers', grammarNote: 'Plural of Zahrah' },
          { arabic: 'حَمْرَاءُ', transliteration: 'ḥamrā’', english: 'red (f)', grammarNote: 'Color adjective' },
          { arabic: 'وَ', transliteration: 'wa', english: 'and' },
          { arabic: 'صَفْرَاءُ', transliteration: 'ṣafrā’', english: 'yellow (f)', grammarNote: 'Color adjective' }
        ]
      },
      {
        id: 3,
        arabic: 'الأَوْلاَدُ يَلْعَبُونَ بِالكُرَةِ بِسُرُورٍ.',
        transliteration: 'Al-awlādu yal‘abūna bil-kurati bisurūr.',
        english: 'The boys are playing with the ball with joy.',
        words: [
          { arabic: 'الأَوْلاَدُ', transliteration: 'Al-awlād', english: 'The boys / children', grammarNote: 'Plural noun' },
          { arabic: 'يَلْعَبُونَ', transliteration: 'yal‘abūn', english: 'they play', grammarNote: 'Present plural verb' },
          { arabic: 'بِالكُرَةِ', transliteration: 'bil-kurah', english: 'with the ball', grammarNote: 'Preposition bi + noun' },
          { arabic: 'بِسُرُورٍ', transliteration: 'bisurūr', english: 'with joy / gladly', grammarNote: 'Adverbial phrase' }
        ]
      }
    ],
    questions: [
      {
        id: 1,
        questionEn: 'How is the sky described in the passage?',
        questionAr: 'كَيْفَ وُصِفَتِ السَّمَاءُ فِي النَّصِّ؟',
        options: ['Clear (صَافِيَة)', 'Cloudy (غَائِمَة)', 'Rainy (مُمْطِرَة)', 'Dark (مُظْلِمَة)'],
        correctIndex: 0,
        explanation: 'The passage says: "وَالسَّمَاءُ صَافِيَةٌ" (And the sky is clear).'
      },
      {
        id: 2,
        questionEn: 'What colors are the flowers in the garden?',
        questionAr: 'مَا هِيَ أَلْوَانُ الأَزْهَارِ فِي الحَدِيقَةِ؟',
        options: ['Red and Yellow (حَمْرَاء وَصَفْرَاء)', 'Blue and White (زَرْقَاء وَبَيْضَاء)', 'Green and Pink (خَضْرَاء وَوَرْدِيَّة)', 'Purple and Black'],
        correctIndex: 0,
        explanation: 'Sentence 2 states: "أَزْهَارٌ حَمْرَاءُ وَصَفْرَاءُ" (Red and yellow flowers).'
      }
    ]
  },
  {
    id: 'reading-2',
    titleAr: 'طَالِبُ العِلْمِ وَالكِتَابُ',
    titleEn: 'The Student of Knowledge and the Book',
    level: 'intermediate',
    category: 'Education & Wisdom',
    summary: 'A story about a passionate learner named Zayd who discovers the treasure of the city library.',
    culturalNote: 'Seeking knowledge is deeply venerated in Arab culture: "اطلبوا العلم من المهد إلى اللحد" (Seek knowledge from the cradle to the grave).',
    sentences: [
      {
        id: 1,
        arabic: 'زَيْدٌ طَالِبٌ يُحِبُّ القِرَاءَةَ وَالكِتَابَةَ كَثِيرًا.',
        transliteration: 'Zaydun ṭālibun yuḥibbul-qirā’ata wal-kitābata kathīran.',
        english: 'Zayd is a student who loves reading and writing very much.',
        words: [
          { arabic: 'زَيْدٌ', transliteration: 'Zayd', english: 'Zayd (Name)', grammarNote: 'Subject' },
          { arabic: 'طَالِبٌ', transliteration: 'ṭālib', english: 'a student', grammarNote: 'Predicate (خَبَر)' },
          { arabic: 'يُحِبُّ', transliteration: 'yuḥibbu', english: 'he loves', grammarNote: 'Present verb' },
          { arabic: 'القِرَاءَةَ', transliteration: 'al-qirā’ah', english: 'reading', grammarNote: 'Object (مَفْعُول بِهِ)' },
          { arabic: 'وَالكِتَابَةَ', transliteration: 'wal-kitābah', english: 'and writing' },
          { arabic: 'كَثِيرًا', transliteration: 'kathīran', english: 'a lot / very much', grammarNote: 'Adverb' }
        ]
      },
      {
        id: 2,
        arabic: 'يَذْهَبُ زَيْدٌ كُلَّ يَوْمٍ إِلَى مَكْتَبَةِ المَدِينَةِ لِيَقْرَأَ كُتُبَ التَّارِيخِ.',
        transliteration: 'Yadhhabu Zaydun kulla yawmin ilā maktabatil-madīnati liyaqra’a kutubat-tārīkh.',
        english: 'Zayd goes every day to the city library to read history books.',
        words: [
          { arabic: 'يَذْهَبُ', transliteration: 'yadhhabu', english: 'he goes', grammarNote: 'Present verb' },
          { arabic: 'زَيْدٌ', transliteration: 'Zayd', english: 'Zayd', grammarNote: 'Doer (فَاعِل)' },
          { arabic: 'كُلَّ يَوْمٍ', transliteration: 'kulla yawm', english: 'every day' },
          { arabic: 'إِلَى', transliteration: 'ilā', english: 'to', grammarNote: 'Preposition' },
          { arabic: 'مَكْتَبَةِ', transliteration: 'maktabah', english: 'library of', grammarNote: 'Idafa (first term)' },
          { arabic: 'المَدِينَةِ', transliteration: 'al-madīnah', english: 'the city', grammarNote: 'Idafa (second term)' },
          { arabic: 'لِيَقْرَأَ', transliteration: 'liyaqra’a', english: 'in order to read', grammarNote: 'Subjunctive verb with Lam' },
          { arabic: 'كُتُبَ', transliteration: 'kutub', english: 'books of', grammarNote: 'Plural of Kitab' },
          { arabic: 'التَّارِيخِ', transliteration: 'at-tārīkh', english: 'history' }
        ]
      },
      {
        id: 3,
        arabic: 'قَالَ زَيْدٌ: «الكِتَابُ خَيْرُ جَلِيسٍ فِي الزَّمَانِ».',
        transliteration: 'Qāla Zayd: «Al-kitābu khayru jalīsin fīz-zamān».',
        english: 'Zayd said: "A book is the best companion in time."',
        words: [
          { arabic: 'قَالَ', transliteration: 'qāla', english: 'he said', grammarNote: 'Past tense verb' },
          { arabic: 'الكِتَابُ', transliteration: 'al-kitāb', english: 'The book' },
          { arabic: 'خَيْرُ', transliteration: 'khayru', english: 'the best of', grammarNote: 'Superlative' },
          { arabic: 'جَلِيسٍ', transliteration: 'jalīs', english: 'a companion / seated friend' },
          { arabic: 'فِي', transliteration: 'fī', english: 'in' },
          { arabic: 'الزَّمَانِ', transliteration: 'az-zamān', english: 'time / era' }
        ]
      }
    ],
    questions: [
      {
        id: 1,
        questionEn: 'Where does Zayd go every day?',
        questionAr: 'أَيْنَ يَذْهَبُ زَيْدٌ كُلَّ يَوْمٍ؟',
        options: ['To the city library (مَكْتَبَةِ المَدِينَةِ)', 'To the sports field (المَلْعَبِ)', 'To the grocery store (السُّوقِ)', 'To the restaurant (المَطْعَمِ)'],
        correctIndex: 0,
        explanation: 'Sentence 2 states: "يَذْهَبُ زَيْدٌ كُلَّ يَوْمٍ إِلَى مَكْتَبَةِ المَدِينَةِ".'
      },
      {
        id: 2,
        questionEn: 'According to Zayd\'s quote, what is the best companion?',
        questionAr: 'بِحَسَبِ كَلاَمِ زَيْدٍ، مَا هُوَ خَيْرُ جَلِيسٍ؟',
        options: ['The Book (الكِتَابُ)', 'The Phone (الهَاتِفُ)', 'Money (المَالُ)', 'Travel (السَّفَرُ)'],
        correctIndex: 0,
        explanation: 'He quoted the classic Arabic poetic proverb: "الكِتَابُ خَيْرُ جَلِيسٍ فِي الزَّمَانِ".'
      }
    ]
  },
  {
    id: 'reading-3',
    titleAr: 'زِيَارَةٌ إِلَى السُّوقِ القَدِيمِ',
    titleEn: 'A Visit to the Ancient Souq',
    level: 'advanced',
    category: 'Culture & Commerce',
    summary: 'An atmospheric stroll through a traditional bustling Arab bazaar filled with spices, fabrics, and hospitality.',
    culturalNote: 'Traditional souqs (like Khan el-Khalili in Cairo or Al-Hamidiyah in Damascus) are the vibrant sensory heart of historic Arab cities.',
    sentences: [
      {
        id: 1,
        arabic: 'تَفُوحُ فِي السُّوقِ القَدِيمِ رَوَائِحُ البُخُورِ وَالتَّوَابِلِ الشَّرْقِيَّةِ الزَّكِيَّةِ.',
        transliteration: 'Tafūḥu fīs-sūqil-qadīmi rawā’iḥul-bukhūri wat-tawābilish-sharqiyyātiz-zakiyyah.',
        english: 'The fragrant scents of incense and aromatic eastern spices waft through the ancient market.',
        words: [
          { arabic: 'تَفُوحُ', transliteration: 'tafūḥu', english: 'wafts / diffuses', grammarNote: 'Present verb (f)' },
          { arabic: 'فِي', transliteration: 'fī', english: 'in' },
          { arabic: 'السُّوقِ', transliteration: 'as-sūq', english: 'the market' },
          { arabic: 'القَدِيمِ', transliteration: 'al-qadīm', english: 'ancient / old' },
          { arabic: 'رَوَائِحُ', transliteration: 'rawā’iḥ', english: 'scents (plural)' },
          { arabic: 'البُخُورِ', transliteration: 'al-bukhūr', english: 'incense' },
          { arabic: 'وَالتَّوَابِلِ', transliteration: 'wat-tawābil', english: 'and spices' },
          { arabic: 'الشَّرْقِيَّةِ', transliteration: 'ash-sharqiyyah', english: 'eastern / oriental' },
          { arabic: 'الزَّكِيَّةِ', transliteration: 'az-zakiyyah', english: 'fragrant / pure' }
        ]
      },
      {
        id: 2,
        arabic: 'يُرَحِّبُ التُّجَّارُ بِالزُّوَّارِ بِابْتِسَامَةٍ وَيُقَدِّمُونَ لَهُمُ الشَّايَ بِالنَّعْنَاعِ.',
        transliteration: 'Yuraḥḥibut-tujjāru biz-zuwwāri bibtisāmatin wa yuqaddimūna lahumush-shāya bin-na‘nā‘.',
        english: 'Merchants welcome visitors with a smile and offer them hot mint tea.',
        words: [
          { arabic: 'يُرَحِّبُ', transliteration: 'yuraḥḥibu', english: 'welcomes', grammarNote: 'Form II verb' },
          { arabic: 'التُّجَّارُ', transliteration: 'at-tujjār', english: 'the merchants', grammarNote: 'Broken plural of Tājir' },
          { arabic: 'بِالزُّوَّارِ', transliteration: 'biz-zuwwār', english: 'visitors', grammarNote: 'Plural of Zā’ir' },
          { arabic: 'بِابْتِسَامَةٍ', transliteration: 'bibtisāmah', english: 'with a smile' },
          { arabic: 'وَيُقَدِّمُونَ', transliteration: 'wa yuqaddimūn', english: 'and they offer / serve' },
          { arabic: 'لَهُمُ', transliteration: 'lahum', english: 'to them' },
          { arabic: 'الشَّايَ', transliteration: 'ash-shāy', english: 'tea' },
          { arabic: 'بِالنَّعْنَاعِ', transliteration: 'bin-na‘nā‘', english: 'with mint' }
        ]
      }
    ],
    questions: [
      {
        id: 1,
        questionEn: 'What drink do the merchants offer to visitors?',
        questionAr: 'مَا هُوَ المَشْرُوبُ الَّذِي يُقَدِّمُهُ التُّجَّارُ لِلزُّوَّارِ؟',
        options: ['Mint tea (الشَّاي بِالنَّعْنَاع)', 'Cold juice (عَصِير بَارِد)', 'Pure milk (حَلِيب صَافٍ)', 'Water only'],
        correctIndex: 0,
        explanation: 'Sentence 2 states: "وَيُقَدِّمُونَ لَهُمُ الشَّايَ بِالنَّعْنَاعِ" (And offer them mint tea).'
      }
    ]
  }
];
