import { ArabicLetter } from '../types';

export const ALPHABET_DATA: ArabicLetter[] = [
  {
    id: 1,
    letter: 'ا',
    nameEn: 'Alif',
    nameAr: 'أَلِف',
    transliteration: 'ā / a',
    pronunciationGuide: 'Long "aa" vowel like in "father", or acts as a carrier for vowels when bearing a Hamza.',
    makhraj: 'From the emptiness of the mouth and throat (الجَوْف - Al-Jawf).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: true,
    forms: {
      isolated: 'ا',
      initial: 'ا',
      medial: 'ـا',
      final: 'ـا'
    },
    vowels: {
      fatha: 'أَ',
      fathaTranslit: 'a',
      damma: 'أُ',
      dammaTranslit: 'u',
      kasra: 'إِ',
      kasraTranslit: 'i',
      sukun: 'أْ',
      sukunTranslit: '’'
    },
    exampleWord: {
      arabic: 'أَسَدٌ',
      transliteration: 'Asad',
      english: 'Lion',
      position: 'initial'
    }
  },
  {
    id: 2,
    letter: 'ب',
    nameEn: 'Baa',
    nameAr: 'بَاء',
    transliteration: 'b',
    pronunciationGuide: 'Like English "b" in "book". Produced by pressing the two lips together.',
    makhraj: 'From between the two lips (الشَّفَتَان - Ash-Shafataan).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ب',
      initial: 'بـ',
      medial: 'ـبـ',
      final: 'ـب'
    },
    vowels: {
      fatha: 'بَ',
      fathaTranslit: 'ba',
      damma: 'بُ',
      dammaTranslit: 'bu',
      kasra: 'بِ',
      kasraTranslit: 'bi',
      sukun: 'بْ',
      sukunTranslit: 'b'
    },
    exampleWord: {
      arabic: 'بَيْتٌ',
      transliteration: 'Bayt',
      english: 'House',
      position: 'initial'
    }
  },
  {
    id: 3,
    letter: 'ت',
    nameEn: 'Taa',
    nameAr: 'تَاء',
    transliteration: 't',
    pronunciationGuide: 'Like English "t" in "table". Tip of tongue touching the base of the upper front teeth.',
    makhraj: 'Tip of tongue against the upper front teeth base (طَرَف اللِّسَان - Taraf al-Lisan).',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ت',
      initial: 'تـ',
      medial: 'ـتـ',
      final: 'ـت'
    },
    vowels: {
      fatha: 'تَ',
      fathaTranslit: 'ta',
      damma: 'تُ',
      dammaTranslit: 'tu',
      kasra: 'تِ',
      kasraTranslit: 'ti',
      sukun: 'تْ',
      sukunTranslit: 't'
    },
    exampleWord: {
      arabic: 'تُفَّاحٌ',
      transliteration: 'Tuffāḥ',
      english: 'Apple',
      position: 'initial'
    }
  },
  {
    id: 4,
    letter: 'ث',
    nameEn: 'Thaa',
    nameAr: 'ثَاء',
    transliteration: 'th',
    pronunciationGuide: 'Like the unvoiced "th" in "think" or "three". Tip of the tongue rests gently between front teeth.',
    makhraj: 'Tip of the tongue between upper and lower incisors.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ث',
      initial: 'ثـ',
      medial: 'ـثـ',
      final: 'ـث'
    },
    vowels: {
      fatha: 'ثَ',
      fathaTranslit: 'tha',
      damma: 'ثُ',
      dammaTranslit: 'thu',
      kasra: 'ثِ',
      kasraTranslit: 'thi',
      sukun: 'ثْ',
      sukunTranslit: 'th'
    },
    exampleWord: {
      arabic: 'ثَعْلَبٌ',
      transliteration: 'Tha‘lab',
      english: 'Fox',
      position: 'initial'
    }
  },
  {
    id: 5,
    letter: 'ج',
    nameEn: 'Jeem',
    nameAr: 'جِيم',
    transliteration: 'j',
    pronunciationGuide: 'Like English "j" in "jam" (in Standard Arabic) or "s" in "measure" in Levantine.',
    makhraj: 'Middle of the tongue against the hard palate (وَسَط اللِّسَان - Wasat al-Lisan).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ج',
      initial: 'جـ',
      medial: 'ـجـ',
      final: 'ـج'
    },
    vowels: {
      fatha: 'جَ',
      fathaTranslit: 'ja',
      damma: 'جُ',
      dammaTranslit: 'ju',
      kasra: 'جِ',
      kasraTranslit: 'ji',
      sukun: 'جْ',
      sukunTranslit: 'j'
    },
    exampleWord: {
      arabic: 'جَمَلٌ',
      transliteration: 'Jamal',
      english: 'Camel',
      position: 'initial'
    }
  },
  {
    id: 6,
    letter: 'ح',
    nameEn: 'Haa (Raspy / Whispered)',
    nameAr: 'حَاء',
    transliteration: 'ḥ',
    pronunciationGuide: 'A deep, breathy "h" from the middle of the throat, like breathing on cold glass to fog it up.',
    makhraj: 'Middle of the throat (وَسَط الحَلْق - Wasat al-Halq).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ح',
      initial: 'حـ',
      medial: 'ـحـ',
      final: 'ـح'
    },
    vowels: {
      fatha: 'حَ',
      fathaTranslit: 'ḥa',
      damma: 'حُ',
      dammaTranslit: 'ḥu',
      kasra: 'حِ',
      kasraTranslit: 'ḥi',
      sukun: 'حْ',
      sukunTranslit: 'ḥ'
    },
    exampleWord: {
      arabic: 'حَدِيقَةٌ',
      transliteration: 'Ḥadīqah',
      english: 'Garden',
      position: 'initial'
    }
  },
  {
    id: 7,
    letter: 'خ',
    nameEn: 'Khaa',
    nameAr: 'خَاء',
    transliteration: 'kh',
    pronunciationGuide: 'A raspy gutteral sound like the "ch" in German "Bach" or Scottish "Loch".',
    makhraj: 'Top of the throat nearest to mouth (أَدْنَى الحَلْق - Adna al-Halq).',
    isEmphatic: true,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'خ',
      initial: 'خـ',
      medial: 'ـخـ',
      final: 'ـخ'
    },
    vowels: {
      fatha: 'خَ',
      fathaTranslit: 'kha',
      damma: 'خُ',
      dammaTranslit: 'khu',
      kasra: 'خِ',
      kasraTranslit: 'khi',
      sukun: 'خْ',
      sukunTranslit: 'kh'
    },
    exampleWord: {
      arabic: 'خُبْزٌ',
      transliteration: 'Khubz',
      english: 'Bread',
      position: 'initial'
    }
  },
  {
    id: 8,
    letter: 'د',
    nameEn: 'Daal',
    nameAr: 'دَال',
    transliteration: 'd',
    pronunciationGuide: 'Like English "d" in "door". Crisp dental "d".',
    makhraj: 'Tip of the tongue against the base of upper incisors.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: true,
    forms: {
      isolated: 'د',
      initial: 'د',
      medial: 'ـد',
      final: 'ـد'
    },
    vowels: {
      fatha: 'دَ',
      fathaTranslit: 'da',
      damma: 'دُ',
      dammaTranslit: 'du',
      kasra: 'دِ',
      kasraTranslit: 'di',
      sukun: 'دْ',
      sukunTranslit: 'd'
    },
    exampleWord: {
      arabic: 'دَفْتَرٌ',
      transliteration: 'Daftar',
      english: 'Notebook',
      position: 'initial'
    }
  },
  {
    id: 9,
    letter: 'ذ',
    nameEn: 'Thaal',
    nameAr: 'ذَال',
    transliteration: 'dh',
    pronunciationGuide: 'Voiced "th" like in "that", "this", or "feather".',
    makhraj: 'Tip of the tongue between the upper and lower front teeth.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: true,
    forms: {
      isolated: 'ذ',
      initial: 'ذ',
      medial: 'ـذ',
      final: 'ـذ'
    },
    vowels: {
      fatha: 'ذَ',
      fathaTranslit: 'dha',
      damma: 'ذُ',
      dammaTranslit: 'dhu',
      kasra: 'ذِ',
      kasraTranslit: 'dhi',
      sukun: 'ذْ',
      sukunTranslit: 'dh'
    },
    exampleWord: {
      arabic: 'ذَهَبٌ',
      transliteration: 'Dhahab',
      english: 'Gold',
      position: 'initial'
    }
  },
  {
    id: 10,
    letter: 'ر',
    nameEn: 'Raa',
    nameAr: 'رَاء',
    transliteration: 'r',
    pronunciationGuide: 'Lightly tapped or rolled "r", like in Spanish "pero" or Italian.',
    makhraj: 'Tip of the tongue vibrating slightly near the gum ridge.',
    isEmphatic: false, // context dependent
    type: 'sun',
    isNonConnector: true,
    forms: {
      isolated: 'ر',
      initial: 'ر',
      medial: 'ـر',
      final: 'ـر'
    },
    vowels: {
      fatha: 'رَ',
      fathaTranslit: 'ra',
      damma: 'رُ',
      dammaTranslit: 'ru',
      kasra: 'رِ',
      kasraTranslit: 'ri',
      sukun: 'رْ',
      sukunTranslit: 'r'
    },
    exampleWord: {
      arabic: 'رَسُولٌ',
      transliteration: 'Rasūl',
      english: 'Messenger',
      position: 'initial'
    }
  },
  {
    id: 11,
    letter: 'ز',
    nameEn: 'Zaay',
    nameAr: 'زَاي',
    transliteration: 'z',
    pronunciationGuide: 'Like English "z" in "zebra".',
    makhraj: 'Tip of tongue just above lower teeth.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: true,
    forms: {
      isolated: 'ز',
      initial: 'ز',
      medial: 'ـز',
      final: 'ـز'
    },
    vowels: {
      fatha: 'زَ',
      fathaTranslit: 'za',
      damma: 'زُ',
      dammaTranslit: 'zu',
      kasra: 'زِ',
      kasraTranslit: 'zi',
      sukun: 'زْ',
      sukunTranslit: 'z'
    },
    exampleWord: {
      arabic: 'زَهْرَةٌ',
      transliteration: 'Zahrah',
      english: 'Flower',
      position: 'initial'
    }
  },
  {
    id: 12,
    letter: 'س',
    nameEn: 'Seen',
    nameAr: 'سِين',
    transliteration: 's',
    pronunciationGuide: 'Like English "s" in "sun". Clean, crisp whistling sound.',
    makhraj: 'Tip of tongue touching the back of lower front teeth.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'س',
      initial: 'سـ',
      medial: 'ـسـ',
      final: 'ـس'
    },
    vowels: {
      fatha: 'سَ',
      fathaTranslit: 'sa',
      damma: 'سُ',
      dammaTranslit: 'su',
      kasra: 'سِ',
      kasraTranslit: 'si',
      sukun: 'سْ',
      sukunTranslit: 's'
    },
    exampleWord: {
      arabic: 'سَمَاءٌ',
      transliteration: 'Samā’',
      english: 'Sky',
      position: 'initial'
    }
  },
  {
    id: 13,
    letter: 'ش',
    nameEn: 'Sheen',
    nameAr: 'شِين',
    transliteration: 'sh',
    pronunciationGuide: 'Like English "sh" in "shine" or "shoe".',
    makhraj: 'Middle of the tongue against the hard palate.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ش',
      initial: 'شـ',
      medial: 'ـشـ',
      final: 'ـش'
    },
    vowels: {
      fatha: 'شَ',
      fathaTranslit: 'sha',
      damma: 'شُ',
      dammaTranslit: 'shu',
      kasra: 'شِ',
      kasraTranslit: 'shi',
      sukun: 'شْ',
      sukunTranslit: 'sh'
    },
    exampleWord: {
      arabic: 'شَمْسٌ',
      transliteration: 'Shams',
      english: 'Sun',
      position: 'initial'
    }
  },
  {
    id: 14,
    letter: 'ص',
    nameEn: 'Saad (Emphatic S)',
    nameAr: 'صَاد',
    transliteration: 'ṣ',
    pronunciationGuide: 'Deep, heavy, emphatic "S". Produced by raising the back of the tongue toward the soft palate.',
    makhraj: 'Tip of tongue against lower teeth with back of tongue raised (الإطباق - Al-Itbaaq).',
    isEmphatic: true,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ص',
      initial: 'صـ',
      medial: 'ـصـ',
      final: 'ـص'
    },
    vowels: {
      fatha: 'صَ',
      fathaTranslit: 'ṣa',
      damma: 'صُ',
      dammaTranslit: 'ṣu',
      kasra: 'صِ',
      kasraTranslit: 'ṣi',
      sukun: 'صْ',
      sukunTranslit: 'ṣ'
    },
    exampleWord: {
      arabic: 'صَبَاحٌ',
      transliteration: 'Ṣabāḥ',
      english: 'Morning',
      position: 'initial'
    }
  },
  {
    id: 15,
    letter: 'ض',
    nameEn: 'Daad (Emphatic D)',
    nameAr: 'ضَاد',
    transliteration: 'ḍ',
    pronunciationGuide: 'Unique to Arabic (لغة الضاد). Heavy, deep "D" made with the side of the tongue touching upper molars.',
    makhraj: 'One or both edges of the tongue against upper molars (حَافَة اللِّسَان - Hāfat al-Lisān).',
    isEmphatic: true,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ض',
      initial: 'ضـ',
      medial: 'ـضـ',
      final: 'ـض'
    },
    vowels: {
      fatha: 'ضَ',
      fathaTranslit: 'ḍa',
      damma: 'ضُ',
      dammaTranslit: 'ḍu',
      kasra: 'ضِ',
      kasraTranslit: 'ḍi',
      sukun: 'ضْ',
      sukunTranslit: 'ḍ'
    },
    exampleWord: {
      arabic: 'ضَوْءٌ',
      transliteration: 'Ḍaw’',
      english: 'Light',
      position: 'initial'
    }
  },
  {
    id: 16,
    letter: 'ط',
    nameEn: 'Taa (Emphatic T)',
    nameAr: 'طَاء',
    transliteration: 'ṭ',
    pronunciationGuide: 'Heavy, emphatic "T". Like in "tall" but much deeper and fuller with palate resonance.',
    makhraj: 'Tip of the tongue against upper teeth roots with back of tongue raised.',
    isEmphatic: true,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ط',
      initial: 'طـ',
      medial: 'ـطـ',
      final: 'ـط'
    },
    vowels: {
      fatha: 'طَ',
      fathaTranslit: 'ṭa',
      damma: 'طُ',
      dammaTranslit: 'ṭu',
      kasra: 'طِ',
      kasraTranslit: 'ṭi',
      sukun: 'طْ',
      sukunTranslit: 'ṭ'
    },
    exampleWord: {
      arabic: 'طَالِبٌ',
      transliteration: 'Ṭālib',
      english: 'Student',
      position: 'initial'
    }
  },
  {
    id: 17,
    letter: 'ظ',
    nameEn: 'Dhaa (Emphatic DH)',
    nameAr: 'ظَاء',
    transliteration: 'ẓ',
    pronunciationGuide: 'Heavy, emphatic voiced "th" sound. Tongue between teeth with deep throat backing.',
    makhraj: 'Tip of tongue between front teeth with back elevated.',
    isEmphatic: true,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ظ',
      initial: 'ظـ',
      medial: 'ـظـ',
      final: 'ـظ'
    },
    vowels: {
      fatha: 'ظَ',
      fathaTranslit: 'ẓa',
      damma: 'ظُ',
      dammaTranslit: 'ẓu',
      kasra: 'ظِ',
      kasraTranslit: 'ẓi',
      sukun: 'ظْ',
      sukunTranslit: 'ẓ'
    },
    exampleWord: {
      arabic: 'ظِلٌّ',
      transliteration: 'Ẓill',
      english: 'Shadow',
      position: 'initial'
    }
  },
  {
    id: 18,
    letter: 'ع',
    nameEn: 'Ayn',
    nameAr: 'عَيْن',
    transliteration: '‘',
    pronunciationGuide: 'A deep guttural squeeze from the middle of the throat. Has no English equivalent.',
    makhraj: 'Middle of the throat (وَسَط الحَلْق - Wasat al-Halq).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ع',
      initial: 'عـ',
      medial: 'ـعـ',
      final: 'ـع'
    },
    vowels: {
      fatha: 'عَ',
      fathaTranslit: '‘a',
      damma: 'عُ',
      dammaTranslit: '‘u',
      kasra: 'عِ',
      kasraTranslit: '‘i',
      sukun: 'عْ',
      sukunTranslit: '‘'
    },
    exampleWord: {
      arabic: 'عَيْنٌ',
      transliteration: '‘Ayn',
      english: 'Eye / Spring',
      position: 'initial'
    }
  },
  {
    id: 19,
    letter: 'غ',
    nameEn: 'Ghayn',
    nameAr: 'غَيْن',
    transliteration: 'gh',
    pronunciationGuide: 'Like the French or German "r" sound (Parisian "r"), or gargling water.',
    makhraj: 'Upper part of the throat near uvula.',
    isEmphatic: true,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'غ',
      initial: 'غـ',
      medial: 'ـغـ',
      final: 'ـغ'
    },
    vowels: {
      fatha: 'غَ',
      fathaTranslit: 'gha',
      damma: 'غُ',
      dammaTranslit: 'ghu',
      kasra: 'غِ',
      kasraTranslit: 'ghi',
      sukun: 'غْ',
      sukunTranslit: 'gh'
    },
    exampleWord: {
      arabic: 'غُرْفَةٌ',
      transliteration: 'Ghurfah',
      english: 'Room',
      position: 'initial'
    }
  },
  {
    id: 20,
    letter: 'ف',
    nameEn: 'Faa',
    nameAr: 'فَاء',
    transliteration: 'f',
    pronunciationGuide: 'Like English "f" in "food". Upper front teeth touching lower lip.',
    makhraj: 'Edge of upper front teeth on inner part of lower lip.',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ف',
      initial: 'فـ',
      medial: 'ـفـ',
      final: 'ـف'
    },
    vowels: {
      fatha: 'فَ',
      fathaTranslit: 'fa',
      damma: 'فُ',
      dammaTranslit: 'fu',
      kasra: 'فِ',
      kasraTranslit: 'fi',
      sukun: 'فْ',
      sukunTranslit: 'f'
    },
    exampleWord: {
      arabic: 'فِيلٌ',
      transliteration: 'Fīl',
      english: 'Elephant',
      position: 'initial'
    }
  },
  {
    id: 21,
    letter: 'ق',
    nameEn: 'Qaaf (Deep K)',
    nameAr: 'قَاف',
    transliteration: 'q',
    pronunciationGuide: 'A deep, heavy "k" produced from the far back of the tongue hitting the uvula/soft palate.',
    makhraj: 'Far back of the tongue with soft palate (أَقْصَى اللِّسَان - Aqsa al-Lisan).',
    isEmphatic: true,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ق',
      initial: 'قـ',
      medial: 'ـقـ',
      final: 'ـق'
    },
    vowels: {
      fatha: 'قَ',
      fathaTranslit: 'qa',
      damma: 'قُ',
      dammaTranslit: 'qu',
      kasra: 'قِ',
      kasraTranslit: 'qi',
      sukun: 'قْ',
      sukunTranslit: 'q'
    },
    exampleWord: {
      arabic: 'قَلَمٌ',
      transliteration: 'Qalam',
      english: 'Pen',
      position: 'initial'
    }
  },
  {
    id: 22,
    letter: 'ك',
    nameEn: 'Kaaf',
    nameAr: 'كَاف',
    transliteration: 'k',
    pronunciationGuide: 'Like English "k" in "kite". Crisp and light sound.',
    makhraj: 'Back of tongue just forward from Qaaf.',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ك',
      initial: 'كـ',
      medial: 'ـكـ',
      final: 'ـك'
    },
    vowels: {
      fatha: 'كَ',
      fathaTranslit: 'ka',
      damma: 'كُ',
      dammaTranslit: 'ku',
      kasra: 'كِ',
      kasraTranslit: 'ki',
      sukun: 'كْ',
      sukunTranslit: 'k'
    },
    exampleWord: {
      arabic: 'كِتَابٌ',
      transliteration: 'Kitāb',
      english: 'Book',
      position: 'initial'
    }
  },
  {
    id: 23,
    letter: 'ل',
    nameEn: 'Laam',
    nameAr: 'لاَم',
    transliteration: 'l',
    pronunciationGuide: 'Like English "l" in "light" (and heavy in "Allah").',
    makhraj: 'Sides and tip of tongue against upper gums.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ل',
      initial: 'لـ',
      medial: 'ـلـ',
      final: 'ـل'
    },
    vowels: {
      fatha: 'لَ',
      fathaTranslit: 'la',
      damma: 'لُ',
      dammaTranslit: 'lu',
      kasra: 'لِ',
      kasraTranslit: 'li',
      sukun: 'لْ',
      sukunTranslit: 'l'
    },
    exampleWord: {
      arabic: 'لَيْلٌ',
      transliteration: 'Layl',
      english: 'Night',
      position: 'initial'
    }
  },
  {
    id: 24,
    letter: 'م',
    nameEn: 'Meem',
    nameAr: 'مِيم',
    transliteration: 'm',
    pronunciationGuide: 'Like English "m" in "moon". Made with lips together and nasal resonance.',
    makhraj: 'Between both lips with nasal cavity resonance (الغُنَّة - Al-Ghunnah).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'م',
      initial: 'مـ',
      medial: 'ـمـ',
      final: 'ـم'
    },
    vowels: {
      fatha: 'مَ',
      fathaTranslit: 'ma',
      damma: 'مُ',
      dammaTranslit: 'mu',
      kasra: 'مِ',
      kasraTranslit: 'mi',
      sukun: 'مْ',
      sukunTranslit: 'm'
    },
    exampleWord: {
      arabic: 'مَسْجِدٌ',
      transliteration: 'Masjid',
      english: 'Mosque',
      position: 'initial'
    }
  },
  {
    id: 25,
    letter: 'ن',
    nameEn: 'Noon',
    nameAr: 'نُون',
    transliteration: 'n',
    pronunciationGuide: 'Like English "n" in "noon".',
    makhraj: 'Tip of tongue on the upper gums.',
    isEmphatic: false,
    type: 'sun',
    isNonConnector: false,
    forms: {
      isolated: 'ن',
      initial: 'نـ',
      medial: 'ـنـ',
      final: 'ـن'
    },
    vowels: {
      fatha: 'نَ',
      fathaTranslit: 'na',
      damma: 'نُ',
      dammaTranslit: 'nu',
      kasra: 'نِ',
      kasraTranslit: 'ni',
      sukun: 'نْ',
      sukunTranslit: 'n'
    },
    exampleWord: {
      arabic: 'نَجْمٌ',
      transliteration: 'Najm',
      english: 'Star',
      position: 'initial'
    }
  },
  {
    id: 26,
    letter: 'ه',
    nameEn: 'Haa (Soft H)',
    nameAr: 'هَاء',
    transliteration: 'h',
    pronunciationGuide: 'Like English "h" in "hat" or "hope". Soft and easy from bottom of throat.',
    makhraj: 'Deepest bottom of throat (أَقْصَى الحَلْق - Aqsa al-Halq).',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ه',
      initial: 'هـ',
      medial: 'ـهـ',
      final: 'ـه'
    },
    vowels: {
      fatha: 'هَ',
      fathaTranslit: 'ha',
      damma: 'هُ',
      dammaTranslit: 'hu',
      kasra: 'هِ',
      kasraTranslit: 'hi',
      sukun: 'هْ',
      sukunTranslit: 'h'
    },
    exampleWord: {
      arabic: 'هِلاَلٌ',
      transliteration: 'Hilāl',
      english: 'Crescent',
      position: 'initial'
    }
  },
  {
    id: 27,
    letter: 'و',
    nameEn: 'Waaw',
    nameAr: 'وَاو',
    transliteration: 'w / ū',
    pronunciationGuide: 'Consonant "w" as in "water", or long vowel "oo" as in "moon".',
    makhraj: 'Rounding the lips.',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: true,
    forms: {
      isolated: 'و',
      initial: 'و',
      medial: 'ـو',
      final: 'ـو'
    },
    vowels: {
      fatha: 'وَ',
      fathaTranslit: 'wa',
      damma: 'وُ',
      dammaTranslit: 'wu',
      kasra: 'وِ',
      kasraTranslit: 'wi',
      sukun: 'وْ',
      sukunTranslit: 'w'
    },
    exampleWord: {
      arabic: 'وَرْدَةٌ',
      transliteration: 'Wardah',
      english: 'Rose',
      position: 'initial'
    }
  },
  {
    id: 28,
    letter: 'ي',
    nameEn: 'Yaa',
    nameAr: 'يَاء',
    transliteration: 'y / ī',
    pronunciationGuide: 'Consonant "y" as in "yellow", or long vowel "ee" as in "seen".',
    makhraj: 'Middle of tongue raised toward palate.',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ي',
      initial: 'يـ',
      medial: 'ـيـ',
      final: 'ـي'
    },
    vowels: {
      fatha: ' يَ',
      fathaTranslit: 'ya',
      damma: 'يُ',
      dammaTranslit: 'yu',
      kasra: 'يِ',
      kasraTranslit: 'yi',
      sukun: 'يْ',
      sukunTranslit: 'y'
    },
    exampleWord: {
      arabic: 'يَدٌ',
      transliteration: 'Yad',
      english: 'Hand',
      position: 'initial'
    }
  },
  {
    id: 29,
    letter: 'ة',
    nameEn: 'Taa Marbutah',
    nameAr: 'تَاء مَرْبُوطَة',
    transliteration: 'ah / at',
    pronunciationGuide: 'Special feminine ending letter. Sounds like "ah" when stopping, and "at" in joined reading.',
    makhraj: 'End of words only.',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: false,
    forms: {
      isolated: 'ة',
      initial: '—',
      medial: '—',
      final: 'ـة'
    },
    vowels: {
      fatha: 'ـَة',
      fathaTranslit: 'ah',
      damma: 'ـَةٌ',
      dammaTranslit: 'atun',
      kasra: 'ـَةٍ',
      kasraTranslit: 'atin',
      sukun: 'ـَهْ',
      sukunTranslit: 'ah'
    },
    exampleWord: {
      arabic: 'مَدْرَسَةٌ',
      transliteration: 'Madrasah',
      english: 'School',
      position: 'final'
    }
  },
  {
    id: 30,
    letter: 'ء',
    nameEn: 'Hamzah',
    nameAr: 'هَمْزَة',
    transliteration: '’',
    pronunciationGuide: 'A crisp glottal stop, like the break in "uh-oh". Can sit on Alif (أ / إ), Waw (ؤ), Yaa (ئ), or alone (ء).',
    makhraj: 'Deepest part of the vocal cords.',
    isEmphatic: false,
    type: 'moon',
    isNonConnector: true,
    forms: {
      isolated: 'ء',
      initial: 'أَ',
      medial: 'ـئـ',
      final: 'ـء'
    },
    vowels: {
      fatha: 'ءَ',
      fathaTranslit: '’a',
      damma: 'ءُ',
      dammaTranslit: '’u',
      kasra: 'ءِ',
      kasraTranslit: '’i',
      sukun: 'ءْ',
      sukunTranslit: '’'
    },
    exampleWord: {
      arabic: 'سَمَاءٌ',
      transliteration: 'Samā’',
      english: 'Sky',
      position: 'isolated'
    }
  }
];

export const NON_CONNECTING_LETTERS = ['ا', 'د', 'ذ', 'ر', 'ز', 'و', 'أ', 'إ', 'آ', 'ء'];
