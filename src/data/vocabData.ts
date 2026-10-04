import { VocabCategory, VocabWord } from '../types';

export const VOCAB_CATEGORIES: VocabCategory[] = [
  {
    id: 'greetings',
    nameEn: 'Greetings & Courtesies',
    nameAr: 'التَّحِيَّاتُ وَالمُجَامَلاَتُ',
    icon: 'Handshake',
    color: 'emerald',
    description: 'Essential daily Arabic greetings, welcomes, and farewells.'
  },
  {
    id: 'family',
    nameEn: 'Family & People',
    nameAr: 'الأُسْرَةُ وَالنَّاسُ',
    icon: 'Users',
    color: 'blue',
    description: 'Words for parents, siblings, relatives, and professions.'
  },
  {
    id: 'food',
    nameEn: 'Food & Dining',
    nameAr: 'الطَّعَامُ وَالشَّرَابُ',
    icon: 'Utensils',
    color: 'amber',
    description: 'Dishes, fruits, drinks, tableware, and ordering at restaurants.'
  },
  {
    id: 'numbers_time',
    nameEn: 'Numbers & Time',
    nameAr: 'الأَرْقَامُ وَالوَقْتُ',
    icon: 'Clock',
    color: 'purple',
    description: 'Counting from 1-100, days of the week, months, and telling time.'
  },
  {
    id: 'places_travel',
    nameEn: 'Places & Travel',
    nameAr: 'الأَمَاكِنُ وَالسَّفَرُ',
    icon: 'MapPin',
    color: 'rose',
    description: 'Airport, hotel, market, street directions, and transport.'
  },
  {
    id: 'verbs',
    nameEn: 'Essential Verbs',
    nameAr: 'الأَفْعَالُ الأَسَاسِيَّةُ',
    icon: 'Zap',
    color: 'indigo',
    description: 'Core actions in daily conversation (read, write, go, speak, eat).'
  },
  {
    id: 'adjectives',
    nameEn: 'Adjectives & Colors',
    nameAr: 'الصِّفَاتُ وَالأَلْوَانُ',
    icon: 'Palette',
    color: 'teal',
    description: 'Describing size, appearance, mood, qualities, and colors.'
  },
  {
    id: 'islamic_terms',
    nameEn: 'Cultural & Islamic Phrases',
    nameAr: 'عِبَارَاتٌ إِسْلاَمِيَّةٌ وَثَقَافِيَّةٌ',
    icon: 'Moon',
    color: 'cyan',
    description: 'Common cultural phrases of goodwill, gratitude, and remembrance.'
  }
];

export const VOCAB_WORDS: VocabWord[] = [
  // Greetings
  {
    id: 'g-1',
    category: 'greetings',
    arabic: 'السَّلاَمُ عَلَيْكُمْ',
    transliteration: 'As-salāmu ‘alaykum',
    english: 'Peace be upon you (Hello)',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'السَّلاَمُ عَلَيْكُمْ يَا صَدِيقِي!',
      transliteration: 'As-salāmu ‘alaykum yā ṣadīqī!',
      english: 'Peace be upon you, my friend!'
    }
  },
  {
    id: 'g-2',
    category: 'greetings',
    arabic: 'وَعَلَيْكُمُ السَّلاَمُ',
    transliteration: 'Wa ‘alaykumus-salām',
    english: 'And upon you be peace (Reply)',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'وَعَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ.',
      transliteration: 'Wa ‘alaykumus-salāmu wa raḥmatullāh.',
      english: 'And upon you be peace and Allah\'s mercy.'
    }
  },
  {
    id: 'g-3',
    category: 'greetings',
    arabic: 'مَرْحَبًا',
    transliteration: 'Marḥaban',
    english: 'Welcome / Hi',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'مَرْحَبًا بِكُمْ فِي بَيْتِنَا!',
      transliteration: 'Marḥaban bikum fī baytinā!',
      english: 'Welcome to our house!'
    }
  },
  {
    id: 'g-4',
    category: 'greetings',
    arabic: 'صَبَاحُ الخَيْرِ',
    transliteration: 'Ṣabāḥul-khayr',
    english: 'Good morning',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'صَبَاحُ الخَيْرِ، كَيْفَ حَالُكَ؟',
      transliteration: 'Ṣabāḥul-khayr, kayfa ḥāluk?',
      english: 'Good morning, how are you?'
    }
  },
  {
    id: 'g-5',
    category: 'greetings',
    arabic: 'صَبَاحُ النُّورِ',
    transliteration: 'Ṣabāḥun-nūr',
    english: 'Good morning (Reply - "Morning of light")',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'صَبَاحُ النُّورِ يَا أُسْتَاذُ.',
      transliteration: 'Ṣabāḥun-nūri yā ustādh.',
      english: 'Morning of light, teacher.'
    }
  },
  {
    id: 'g-6',
    category: 'greetings',
    arabic: 'مَسَاءُ الخَيْرِ',
    transliteration: 'Masā’ul-khayr',
    english: 'Good evening',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'مَسَاءُ الخَيْرِ لِلْجَمِيعِ.',
      transliteration: 'Masā’ul-khayri lil-jamī‘.',
      english: 'Good evening to everyone.'
    }
  },
  {
    id: 'g-7',
    category: 'greetings',
    arabic: 'كَيْفَ حَالُكَ؟',
    transliteration: 'Kayfa ḥāluka? (m) / ḥāluki? (f)',
    english: 'How are you?',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'كَيْفَ حَالُكَ اليَوْمَ؟',
      transliteration: 'Kayfa ḥālukal-yawm?',
      english: 'How are you today?'
    }
  },
  {
    id: 'g-8',
    category: 'greetings',
    arabic: 'أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ',
    transliteration: 'Anā bikhayr, al-ḥamdu lillāh',
    english: 'I am fine, praise be to God',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'أَنَا بِخَيْرٍ، الحَمْدُ لِلَّهِ، وَأَنْتَ؟',
      transliteration: 'Anā bikhayr, al-ḥamdu lillāh, wa anta?',
      english: 'I am fine, praise be to God, and you?'
    }
  },
  {
    id: 'g-9',
    category: 'greetings',
    arabic: 'شُكْرًا جَزِيلاً',
    transliteration: 'Shukran jazīlan',
    english: 'Thank you very much',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'شُكْرًا جَزِيلاً عَلَى مُسَاعَدَتِكَ.',
      transliteration: 'Shukran jazīlan ‘alā musā‘adatik.',
      english: 'Thank you very much for your help.'
    }
  },
  {
    id: 'g-10',
    category: 'greetings',
    arabic: 'عَفْوًا',
    transliteration: '‘Afwan',
    english: 'You are welcome / Excuse me',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'عَفْوًا، هَذَا وَاجِبِي.',
      transliteration: '‘Afwan, hādhā wājibī.',
      english: 'You\'re welcome, this is my duty.'
    }
  },
  {
    id: 'g-11',
    category: 'greetings',
    arabic: 'إِلَى اللِّقَاءِ / مَعَ السَّلاَمَةِ',
    transliteration: 'Ilal-liqā’ / Ma‘as-salāmah',
    english: 'Goodbye / Go with peace',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'مَعَ السَّلاَمَةِ، أَرَاكَ غَدًا!',
      transliteration: 'Ma‘as-salāmah, arāka ghadan!',
      english: 'Goodbye, see you tomorrow!'
    }
  },

  // Family
  {
    id: 'f-1',
    category: 'family',
    arabic: 'أَبٌ / وَالِدٌ',
    transliteration: 'Ab / Wālid',
    english: 'Father',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'أَبِي يَعْمَلُ فِي المَدْرَسَةِ.',
      transliteration: 'Abī ya‘malu fīl-madrasah.',
      english: 'My father works in the school.'
    }
  },
  {
    id: 'f-2',
    category: 'family',
    arabic: 'أُمٌّ / وَالِدَةٌ',
    transliteration: 'Umm / Wālidah',
    english: 'Mother',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'أُمِّي تُعِدُّ الطَّعَامَ اللَّذِيذَ.',
      transliteration: 'Ummī tu‘idduṭ-ṭa‘āmal-ladhīdh.',
      english: 'My mother prepares delicious food.'
    }
  },
  {
    id: 'f-3',
    category: 'family',
    arabic: 'أَخٌ',
    transliteration: 'Akh',
    english: 'Brother',
    plural: 'إِخْوَةٌ (Ikhwah)',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'عِنْدِي أَخٌ كَبِيرٌ.',
      transliteration: '‘Indī akhun kabīr.',
      english: 'I have an older brother.'
    }
  },
  {
    id: 'f-4',
    category: 'family',
    arabic: 'أُخْتٌ',
    transliteration: 'Ukht',
    english: 'Sister',
    plural: 'أَخَوَاتٌ (Akhawāt)',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'أُخْتِي تَدْرُسُ الطِّبَّ.',
      transliteration: 'Ukhtī tadrusuṭ-ṭibb.',
      english: 'My sister studies medicine.'
    }
  },
  {
    id: 'f-5',
    category: 'family',
    arabic: 'اِبْنٌ / وَلَدٌ',
    transliteration: 'Ibn / Walad',
    english: 'Son / Boy',
    plural: 'أَبْنَاءٌ / أَوْلاَدٌ',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'هَذَا الوَلَدُ ذَكِيٌّ جِدًّا.',
      transliteration: 'Hādhāl-waladu dhakiyyun jiddan.',
      english: 'This boy is very smart.'
    }
  },
  {
    id: 'f-6',
    category: 'family',
    arabic: 'بِنْتٌ / اِبْنَةٌ',
    transliteration: 'Bint / Ibnah',
    english: 'Daughter / Girl',
    plural: 'بَنَاتٌ (Banāt)',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'البِنْتُ تَقْرَأُ القِصَّةَ.',
      transliteration: 'Al-bintu taqra’ul-qiṣṣah.',
      english: 'The girl is reading the story.'
    }
  },
  {
    id: 'f-7',
    category: 'family',
    arabic: 'جَدٌّ',
    transliteration: 'Jadd',
    english: 'Grandfather',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'جَدِّي يَرْوِي لَنَا الحِكَايَاتِ.',
      transliteration: 'Jaddī yarwī lanal-ḥikāyāt.',
      english: 'My grandfather tells us stories.'
    }
  },
  {
    id: 'f-8',
    category: 'family',
    arabic: 'جَدَّةٌ',
    transliteration: 'Jaddah',
    english: 'Grandmother',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'جَدَّتِي طَيِّبَةُ القَلْبِ.',
      transliteration: 'Jaddatī ṭayyibatul-qalb.',
      english: 'My grandmother is kind-hearted.'
    }
  },
  {
    id: 'f-9',
    category: 'family',
    arabic: 'صَدِيقٌ (m) / صَدِيقَةٌ (f)',
    transliteration: 'Ṣadīq / Ṣadīqah',
    english: 'Friend',
    plural: 'أَصْدِقَاءُ (Aṣdiqā’)',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'زَيْدٌ صَدِيقِي المُخْلِصُ.',
      transliteration: 'Zaydun ṣadīqīl-mukhliṣ.',
      english: 'Zayd is my loyal friend.'
    }
  },

  // Food & Dining
  {
    id: 'fd-1',
    category: 'food',
    arabic: 'مَاءٌ',
    transliteration: 'Mā’',
    english: 'Water',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'أُرِيدُ كَأْسَ مَاءٍ بَارِدٍ، لَوْ سَمَحْتَ.',
      transliteration: 'Urīdu ka’sa mā’in bāridin, law samaḥt.',
      english: 'I want a glass of cold water, please.'
    }
  },
  {
    id: 'fd-2',
    category: 'food',
    arabic: 'خُبْزٌ',
    transliteration: 'Khubz',
    english: 'Bread',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'الخُبْزُ طَازَجٌ وَسَاخِنٌ.',
      transliteration: 'Al-khubzu ṭāzajun wa sākhin.',
      english: 'The bread is fresh and warm.'
    }
  },
  {
    id: 'fd-3',
    category: 'food',
    arabic: 'شَايٌ',
    transliteration: 'Shāy',
    english: 'Tea',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'نَشْرَبُ الشَّايَ بِالنَّعْنَاعِ.',
      transliteration: 'Nashrabush-shāya bin-na‘nā‘.',
      english: 'We drink tea with mint.'
    }
  },
  {
    id: 'fd-4',
    category: 'food',
    arabic: 'قَهْوَةٌ',
    transliteration: 'Qahwah',
    english: 'Coffee',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'القَهْوَةُ العَرَبِيَّةُ لَذِيذَةٌ مَعَ التَّمْرِ.',
      transliteration: 'Al-qahwatul-‘arabiyyatu ladhīdhatun ma‘at-tamr.',
      english: 'Arabic coffee is delicious with dates.'
    }
  },
  {
    id: 'fd-5',
    category: 'food',
    arabic: 'تَمْرٌ',
    transliteration: 'Tamr',
    english: 'Dates',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'أَكَلْتُ ثَلاَثَ تَمَرَاتٍ فِي الصَّبَاحِ.',
      transliteration: 'Akaltu thalātha tamarātin fīṣ-ṣabāḥ.',
      english: 'I ate three dates in the morning.'
    }
  },
  {
    id: 'fd-6',
    category: 'food',
    arabic: 'لَحْمٌ',
    transliteration: 'Laḥm',
    english: 'Meat',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'هَذَا اللَّحْمُ مَشْوِيٌّ جَيِّدًا.',
      transliteration: 'Hādhāl-laḥmu mashwiyyun jayyidan.',
      english: 'This meat is grilled well.'
    }
  },
  {
    id: 'fd-7',
    category: 'food',
    arabic: 'دَجَاجٌ',
    transliteration: 'Dajāj',
    english: 'Chicken',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'أُفَضِّلُ الدَّجَاجَ مَعَ الأُرْزِ.',
      transliteration: 'Ufaḍḍilud-dajāja ma‘al-aruz.',
      english: 'I prefer chicken with rice.'
    }
  },
  {
    id: 'fd-8',
    category: 'food',
    arabic: 'أَرُزٌّ',
    transliteration: 'Aruzz',
    english: 'Rice',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'الأَرُزُّ طَبَقٌ رَئِيسِيٌّ.',
      transliteration: 'Al-aruzzu ṭabaqun ra’īsī.',
      english: 'Rice is a main dish.'
    }
  },
  {
    id: 'fd-9',
    category: 'food',
    arabic: 'فَاكِهَةٌ',
    transliteration: 'Fākihah',
    english: 'Fruit',
    plural: 'فَوَاكِهُ (Fawākih)',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'الفَوَاكِهُ غَنِيَّةٌ بِالفِيتَامِينَاتِ.',
      transliteration: 'Al-fawākihu ghaniyyatun bil-vītāmīnāt.',
      english: 'Fruits are rich in vitamins.'
    }
  },
  {
    id: 'fd-10',
    category: 'food',
    arabic: 'مَطْعَمٌ',
    transliteration: 'Maṭ‘am',
    english: 'Restaurant',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'نَذْهَبُ إِلَى المَطْعَمِ اللَّيْلَةَ.',
      transliteration: 'Nadhhabu ilal-maṭ‘amil-laylah.',
      english: 'We are going to the restaurant tonight.'
    }
  },

  // Numbers & Time
  {
    id: 'num-1',
    category: 'numbers_time',
    arabic: 'وَاحِدٌ (١)',
    transliteration: 'Wāḥid (1)',
    english: 'One',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-2',
    category: 'numbers_time',
    arabic: 'اِثْنَانِ (٢)',
    transliteration: 'Ithnān (2)',
    english: 'Two',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-3',
    category: 'numbers_time',
    arabic: 'ثَلاَثَةٌ (٣)',
    transliteration: 'Thalāthah (3)',
    english: 'Three',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-4',
    category: 'numbers_time',
    arabic: 'أَرْبَعَةٌ (٤)',
    transliteration: 'Arba‘ah (4)',
    english: 'Four',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-5',
    category: 'numbers_time',
    arabic: 'خَمْسَةٌ (٥)',
    transliteration: 'Khamsah (5)',
    english: 'Five',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-6',
    category: 'numbers_time',
    arabic: 'سِتَّةٌ (٦)',
    transliteration: 'Sittah (6)',
    english: 'Six',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-7',
    category: 'numbers_time',
    arabic: 'سَبْعَةٌ (٧)',
    transliteration: 'Sab‘ah (7)',
    english: 'Seven',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-8',
    category: 'numbers_time',
    arabic: 'ثَمَانِيَةٌ (٨)',
    transliteration: 'Thamāniyah (8)',
    english: 'Eight',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-9',
    category: 'numbers_time',
    arabic: 'تِسْعَةٌ (٩)',
    transliteration: 'Tis‘ah (9)',
    english: 'Nine',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-10',
    category: 'numbers_time',
    arabic: 'عَشَرَةٌ (١٠)',
    transliteration: '‘Asharah (10)',
    english: 'Ten',
    partOfSpeech: 'noun'
  },
  {
    id: 'num-11',
    category: 'numbers_time',
    arabic: 'سَاعَةٌ',
    transliteration: 'Sā‘ah',
    english: 'Hour / Watch / Clock',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'كَمِ السَّاعَةُ الآنَ؟',
      transliteration: 'Kamis-sā‘atul-ān?',
      english: 'What time is it now?'
    }
  },
  {
    id: 'num-12',
    category: 'numbers_time',
    arabic: 'اليَوْمَ / أَمْسِ / غَدًا',
    transliteration: 'Al-yawm / Ams / Ghadan',
    english: 'Today / Yesterday / Tomorrow',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'اليَوْمَ يَوْمُ الجُمُعَةِ.',
      transliteration: 'Al-yawmu yawmul-jumu‘ah.',
      english: 'Today is Friday.'
    }
  },

  // Places & Travel
  {
    id: 'pl-1',
    category: 'places_travel',
    arabic: 'بَيْتٌ / مَنْزِلٌ',
    transliteration: 'Bayt / Manzil',
    english: 'House / Home',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'بَيْتِي قَرِيبٌ مِنَ المَسْجِدِ.',
      transliteration: 'Baytī qarībun minal-masjid.',
      english: 'My house is close to the mosque.'
    }
  },
  {
    id: 'pl-2',
    category: 'places_travel',
    arabic: 'مَسْجِدٌ',
    transliteration: 'Masjid',
    english: 'Mosque',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'نُصَلِّي فِي المَسْجِدِ جَمَاعَةً.',
      transliteration: 'Nuṣallī fīl-masjidi jamā‘ah.',
      english: 'We pray in the mosque in congregation.'
    }
  },
  {
    id: 'pl-3',
    category: 'places_travel',
    arabic: 'مَدْرَسَةٌ / جَامِعَةٌ',
    transliteration: 'Madrasah / Jāmi‘ah',
    english: 'School / University',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'هَذِهِ المَدْرَسَةُ كَبِيرَةٌ وَجَمِيلَةٌ.',
      transliteration: 'Hādhihil-madrasatu kabīratun wa jamīlah.',
      english: 'This school is big and beautiful.'
    }
  },
  {
    id: 'pl-4',
    category: 'places_travel',
    arabic: 'سُوقٌ',
    transliteration: 'Sūq',
    english: 'Market / Souq',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'السُّوقُ مَلِيءٌ بِالبَضَائِعِ التَّقْلِيدِيَّةِ.',
      transliteration: 'As-sūqu malī’un bil-baḍā’i‘it-taqlīdiyyah.',
      english: 'The market is full of traditional goods.'
    }
  },
  {
    id: 'pl-5',
    category: 'places_travel',
    arabic: 'مَطَارٌ',
    transliteration: 'Maṭār',
    english: 'Airport',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'وَصَلْنَا إِلَى المَطَارِ فِي الوَقْتِ المُحَدَّدِ.',
      transliteration: 'Waṣalnā ilal-maṭāri fīl-waqtil-muḥaddad.',
      english: 'We arrived at the airport on time.'
    }
  },
  {
    id: 'pl-6',
    category: 'places_travel',
    arabic: 'مَدِينَةٌ',
    transliteration: 'Madīnah',
    english: 'City',
    plural: 'مُدُنٌ (Mudun)',
    partOfSpeech: 'noun',
    exampleSentence: {
      arabic: 'القَاهِرَةُ مَدِينَةٌ تَارِيخِيَّةٌ عَرِيقَةٌ.',
      transliteration: 'Al-Qāhiratu madīnatun tārīkhiyyatun ‘arīqah.',
      english: 'Cairo is an ancient historical city.'
    }
  },

  // Verbs
  {
    id: 'v-1',
    category: 'verbs',
    arabic: 'قَرَأَ / يَقْرَأُ',
    transliteration: 'Qara’a / Yaqra’u',
    english: 'To read (He read / He reads)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'أَنَا أَقْرَأُ كِتَابًا مُفِيدًا.',
      transliteration: 'Anā aqra’u kitāban mufīdan.',
      english: 'I am reading a useful book.'
    }
  },
  {
    id: 'v-2',
    category: 'verbs',
    arabic: 'كَتَبَ / يَكْتُبُ',
    transliteration: 'Kataba / Yaktubu',
    english: 'To write (He wrote / He writes)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'الطَّالِبُ يَكْتُبُ الدَّرْسَ بِالقَلَمِ.',
      transliteration: 'Aṭ-ṭālibu yaktubud-darsa bil-qalam.',
      english: 'The student writes the lesson with a pen.'
    }
  },
  {
    id: 'v-3',
    category: 'verbs',
    arabic: 'ذَهَبَ / يَذْهَبُ',
    transliteration: 'Dhahaba / Yadhhabu',
    english: 'To go (He went / He goes)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'نَذْهَبُ إِلَى العَمَلِ صَبَاحًا.',
      transliteration: 'Nadhhabu ilal-‘amali ṣabāḥan.',
      english: 'We go to work in the morning.'
    }
  },
  {
    id: 'v-4',
    category: 'verbs',
    arabic: 'تَكَلَّمَ / يَتَكَلَّمُ',
    transliteration: 'Takallama / Yatakallamu',
    english: 'To speak (He spoke / He speaks)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'أَتَكَلَّمُ اللُّغَةَ العَرَبِيَّةَ بِفَصَاحَةٍ.',
      transliteration: 'Atakallamul-lughatal-‘arabiyyata bifaṣāḥah.',
      english: 'I speak the Arabic language fluently.'
    }
  },
  {
    id: 'v-5',
    category: 'verbs',
    arabic: 'تَعَلَّمَ / يَتَعَلَّمُ',
    transliteration: 'Ta‘allama / Yata‘allamu',
    english: 'To learn (He learned / He learns)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'أَنَا أَتَعَلَّمُ القِرَاءَةَ وَالكِتَابَةَ.',
      transliteration: 'Anā ata‘allamul-qirā’ata wal-kitābah.',
      english: 'I am learning reading and writing.'
    }
  },
  {
    id: 'v-6',
    category: 'verbs',
    arabic: 'شَرِبَ / يَشْرَبُ',
    transliteration: 'Shariba / Yashrabu',
    english: 'To drink (He drank / He drinks)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'يَشْرَبُ الوَلَدُ الحَلِيبَ كُلَّ صَبَاحٍ.',
      transliteration: 'Yashrabul-waladul-ḥalība kulla ṣabāḥ.',
      english: 'The boy drinks milk every morning.'
    }
  },
  {
    id: 'v-7',
    category: 'verbs',
    arabic: 'أَكَلَ / يَأْكُلُ',
    transliteration: 'Akala / Ya’kulu',
    english: 'To eat (He ate / He eats)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'نَأْكُلُ الفُطُورَ مَعَ العَائِلَةِ.',
      transliteration: 'Na’kulul-fuṭūra ma‘al-‘ā’ilah.',
      english: 'We eat breakfast with the family.'
    }
  },
  {
    id: 'v-8',
    category: 'verbs',
    arabic: 'سَمِعَ / يَسْمَعُ',
    transliteration: 'Sami‘a / Yasma‘u',
    english: 'To hear / listen (He heard / He hears)',
    partOfSpeech: 'verb',
    exampleSentence: {
      arabic: 'أَسْمَعُ صَوْتَ الأَذَانِ.',
      transliteration: 'Asma‘u ṣawtal-adhān.',
      english: 'I hear the sound of the call to prayer.'
    }
  },

  // Adjectives
  {
    id: 'adj-1',
    category: 'adjectives',
    arabic: 'جَمِيلٌ (m) / جَمِيلَةٌ (f)',
    transliteration: 'Jamīl / Jamīlah',
    english: 'Beautiful / Handsome',
    partOfSpeech: 'adjective',
    exampleSentence: {
      arabic: 'هَذِهِ الحَدِيقَةُ جَمِيلَةٌ جِدًّا.',
      transliteration: 'Hādhihil-ḥadīqatu jamīlatun jiddan.',
      english: 'This garden is very beautiful.'
    }
  },
  {
    id: 'adj-2',
    category: 'adjectives',
    arabic: 'كَبِيرٌ (m) / كَبِيرَةٌ (f)',
    transliteration: 'Kabīr / Kabīrah',
    english: 'Big / Large / Old (in age)',
    partOfSpeech: 'adjective',
    exampleSentence: {
      arabic: 'المَسْجِدُ كَبِيرٌ وَوَاسِعٌ.',
      transliteration: 'Al-masjidu kabīrun wa wāsi‘.',
      english: 'The mosque is big and spacious.'
    }
  },
  {
    id: 'adj-3',
    category: 'adjectives',
    arabic: 'صَغِيرٌ (m) / صَغِيرَةٌ (f)',
    transliteration: 'Ṣaghīr / Ṣaghīrah',
    english: 'Small / Young',
    partOfSpeech: 'adjective',
    exampleSentence: {
      arabic: 'العُصْفُورُ صَغِيرٌ عَلَى الشَّجَرَةِ.',
      transliteration: 'Al-‘uṣfūru ṣaghīrun ‘alash-shajarah.',
      english: 'The little bird is on the tree.'
    }
  },
  {
    id: 'adj-4',
    category: 'adjectives',
    arabic: 'سَهْلٌ (m) / سَهْلَةٌ (f)',
    transliteration: 'Sahl / Sahlah',
    english: 'Easy / Simple',
    partOfSpeech: 'adjective',
    exampleSentence: {
      arabic: 'اللُّغَةُ العَرَبِيَّةُ سَهْلَةٌ وَمُمْتِعَةٌ!',
      transliteration: 'Al-lughatul-‘arabiyyatu sahlatun wa mumti‘ah!',
      english: 'The Arabic language is easy and enjoyable!'
    }
  },
  {
    id: 'adj-5',
    category: 'adjectives',
    arabic: 'جَدِيدٌ (m) / جَدِيدَةٌ (f)',
    transliteration: 'Jadīd / Jadīdah',
    english: 'New',
    partOfSpeech: 'adjective',
    exampleSentence: {
      arabic: 'اِشْتَرَيْتُ قَمِيصًا جَدِيدًا.',
      transliteration: 'Ishtaraytu qamīṣan jadīdan.',
      english: 'I bought a new shirt.'
    }
  },
  {
    id: 'adj-6',
    category: 'adjectives',
    arabic: 'قَدِيمٌ (m) / قَدِيمَةٌ (f)',
    transliteration: 'Qadīm / Qadīmah',
    english: 'Old / Ancient (objects)',
    partOfSpeech: 'adjective',
    exampleSentence: {
      arabic: 'القَلْعَةُ قَدِيمَةٌ وَتَارِيخِيَّةٌ.',
      transliteration: 'Al-qal‘atu qadīmatun wa tārīkhiyyah.',
      english: 'The fortress is old and historical.'
    }
  },

  // Islamic & Cultural Terms
  {
    id: 'isl-1',
    category: 'islamic_terms',
    arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ',
    transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
    english: 'In the name of Allah, the Most Gracious, the Most Merciful',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'نَبْدَأُ كُلَّ عَمَلٍ بِقَوْلِ بِسْمِ اللهِ.',
      transliteration: 'Nabda’u kulla ‘amalin biqawli Bismillāh.',
      english: 'We begin every work by saying Bismillah.'
    }
  },
  {
    id: 'isl-2',
    category: 'islamic_terms',
    arabic: 'إِنْ شَاءَ اللهُ',
    transliteration: 'In shā’ Allāh',
    english: 'God willing / If God wills',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'سَنَلْتَقِي غَدًا إِنْ شَاءَ اللهُ.',
      transliteration: 'Sanaltaqī ghadan in shā’ Allāh.',
      english: 'We will meet tomorrow, God willing.'
    }
  },
  {
    id: 'isl-3',
    category: 'islamic_terms',
    arabic: 'مَا شَاءَ اللهُ',
    transliteration: 'Mā shā’ Allāh',
    english: 'What God has willed (Expressing joy/admiration)',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'مَا شَاءَ اللهُ، خَطُّكَ جَمِيلٌ جِدًّا!',
      transliteration: 'Mā shā’ Allāh, khaṭṭuka jamīlun jiddan!',
      english: 'Mashallah, your handwriting is very beautiful!'
    }
  },
  {
    id: 'isl-4',
    category: 'islamic_terms',
    arabic: 'جَزَاكَ اللهُ خَيْرًا',
    transliteration: 'Jazāk Allāhu khayran',
    english: 'May Allah reward you with goodness (Thank you)',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'جَزَاكِ اللهُ خَيْرًا يَا أُخْتِي عَلَى كَرَمِكِ.',
      transliteration: 'Jazākillāhu khayran yā ukhtī ‘alā karamik.',
      english: 'May Allah reward you with good, sister, for your generosity.'
    }
  },
  {
    id: 'isl-5',
    category: 'islamic_terms',
    arabic: 'أَهْلاً وَسَهْلاً',
    transliteration: 'Ahlan wa sahlan',
    english: 'Welcome (Warm hospitality greeting)',
    partOfSpeech: 'phrase',
    exampleSentence: {
      arabic: 'أَهْلاً وَسَهْلاً بِكُمْ فِي بِلادِ العَرَبِ.',
      transliteration: 'Ahlan wa sahlan bikum fī bilādil-‘arab.',
      english: 'Warmly welcome to the lands of the Arabs.'
    }
  }
];
