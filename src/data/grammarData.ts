import { GrammarLesson } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'grammar-1',
    titleEn: 'Noun Gender & Tā’ Marbūṭah',
    titleAr: 'المُذَكَّرُ وَالمُؤَنَّثُ وَالتَّاءُ المَرْبُوطَةُ',
    level: 'A1',
    summary: 'Every Arabic noun is either masculine (مذكر) or feminine (مؤنث). Learn how to identify and form feminine words.',
    keyRule: 'Most feminine nouns end with the letter Tā’ Marbūṭah (ـة / ة). To make a masculine adjective feminine, add ـة to the end.',
    sections: [
      {
        title: '1. The Golden Rule of Gender',
        content: 'In Arabic, masculine is the default base form. When a noun or adjective refers to a female entity or is grammatically feminine, it usually takes a Tā’ Marbūṭah (ـة / ة) suffix.',
        examples: [
          {
            arabic: 'طَالِبٌ (m) ➔ طَالِبَةٌ (f)',
            transliteration: 'Ṭālib ➔ Ṭālibah',
            english: 'Male student ➔ Female student',
            highlight: 'ـة'
          },
          {
            arabic: 'مُعَلِّمٌ (m) ➔ مُعَلِّمَةٌ (f)',
            transliteration: 'Mu‘allim ➔ Mu‘allimah',
            english: 'Male teacher ➔ Female teacher',
            highlight: 'ـة'
          },
          {
            arabic: 'جَمِيلٌ (m) ➔ جَمِيلَةٌ (f)',
            transliteration: 'Jamīl ➔ Jamīlah',
            english: 'Handsome/Beautiful (m) ➔ Beautiful (f)',
            highlight: 'ـة'
          }
        ]
      },
      {
        title: '2. Inherently Feminine Nouns (Without ة)',
        content: 'Some words are inherently feminine even without ة. These include paired body parts (eyes, hands, feet), names of cities and countries, and natural feminine entities (mother, sun, earth).',
        examples: [
          {
            arabic: 'أُمٌّ (Mother), شَمْسٌ (Sun), يَدٌ (Hand), مِصْرُ (Egypt)',
            transliteration: 'Umm, Shams, Yad, Miṣr',
            english: 'All are grammatically feminine!'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which of the following is the feminine form of "صَدِيقٌ" (Friend)?',
        options: ['صَدِيقَةٌ (Ṣadīqah)', 'صَدِيقُونَ (Ṣadīqūn)', 'أَصْدِقَاءُ (Aṣdiqā’)', 'صَدِيقَاتٌ'],
        correctIndex: 0,
        explanation: 'Add the feminine marker Tā’ Marbūṭah (ـة) to get صَدِيقَةٌ.'
      },
      {
        id: 2,
        question: 'Why is "شَمْسٌ" (Sun) considered feminine in Arabic grammar?',
        options: [
          'It is inherently feminine by natural Arabic convention',
          'Because it ends with a Tā’ Marbūṭah',
          'It is actually masculine',
          'Because it is an adjective'
        ],
        correctIndex: 0,
        explanation: 'Words like "شمس" (sun), "أرض" (earth), and "نار" (fire) are feminine by convention (مؤنث مجازي).'
      }
    ]
  },
  {
    id: 'grammar-2',
    titleEn: 'Definite Article & Sun / Moon Letters',
    titleAr: 'أَلْ التَّعْرِيفِ وَالحُرُوفُ الشَّمْسِيَّةُ وَالقَمَرِيَّةُ',
    level: 'A1',
    summary: 'Master how the prefix "Al-" (الـ) interacts with Arabic letters. Learn when to assimilate the "L" sound into a doubled consonant.',
    keyRule: 'Before Sun Letters (14 letters), the "L" of "Al-" is silent and merges into the letter with a Shaddah (ّ). Before Moon Letters (14 letters), the "L" is pronounced clearly.',
    sections: [
      {
        title: '1. Sun Letters (الحُرُوفُ الشَّمْسِيَّةُ)',
        content: 'Sun letters are dental/tongue-tip sounds: (ت، ث، د، ذ، ر، ز، س، ش، ص، ض، ط، ظ، ل، ن). The tongue cannot easily jump from "L" to these sounds, so the "L" assimilates.',
        examples: [
          {
            arabic: 'الشَّمْسُ (ال + شَمْس)',
            transliteration: 'Ash-Shams (NOT "Al-Shams")',
            english: 'The sun',
            highlight: 'شَّ'
          },
          {
            arabic: 'الرَّجُلُ (ال + رَجُل)',
            transliteration: 'Ar-Rajul (NOT "Al-Rajul")',
            english: 'The man',
            highlight: 'رَّ'
          },
          {
            arabic: 'النُّورُ (ال + نُور)',
            transliteration: 'An-Nūr (NOT "Al-Nūr")',
            english: 'The light',
            highlight: 'نُّ'
          }
        ]
      },
      {
        title: '2. Moon Letters (الحُرُوفُ القَمَرِيَّةُ)',
        content: 'Moon letters are throat/lip/back-of-mouth sounds: (أ، ب، ج، ح، خ، ع، غ، ف، ق، ك، م، هـ، و، ي). The "L" is pronounced clearly with a Sukun (الْـ).',
        examples: [
          {
            arabic: 'القَمَرُ (الْ + قَمَر)',
            transliteration: 'Al-Qamar',
            english: 'The moon',
            highlight: 'الْـ'
          },
          {
            arabic: 'الكِتَابُ (الْ + كِتَاب)',
            transliteration: 'Al-Kitāb',
            english: 'The book',
            highlight: 'الْـ'
          },
          {
            arabic: 'البَيْتُ (الْ + بَيْت)',
            transliteration: 'Al-Bayt',
            english: 'The house',
            highlight: 'الْـ'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'How should "ال + سَمَاء" (The sky) be pronounced?',
        options: ['As-Samā’ (Sun letter assimilation)', 'Al-Samā’', 'El-Samā’', 'A-Samā’ without doubling'],
        correctIndex: 0,
        explanation: 'Seen (س) is a sun letter, so the Lam assimilates into a doubled "s": As-Samā’.'
      },
      {
        id: 2,
        question: 'Is the letter "ق" (Qaaf) a Sun or Moon letter?',
        options: ['Moon letter (Al-Qamar)', 'Sun letter', 'Neither', 'Both'],
        correctIndex: 0,
        explanation: 'Qaaf is the quintessential moon letter; in fact "القمر" (The Moon) begins with Qaaf!'
      }
    ]
  },
  {
    id: 'grammar-3',
    titleEn: 'Personal Pronouns (الضَّمَائِرُ)',
    titleAr: 'الضَّمَائِرُ المُنْفَصِلَةُ وَالمُتَّصِلَةُ',
    level: 'A1',
    summary: 'Learn Arabic subject pronouns (I, you, he, she, we, they) and attached possessive suffixes (my, your, his, her).',
    keyRule: 'Arabic has separate forms for singular, dual (2 people), and plural, as well as distinct masculine and feminine "you" and "they".',
    sections: [
      {
        title: '1. Detached Subject Pronouns (الضمائر المنفصلة)',
        content: 'These standalone words act as the subject of a nominal sentence.',
        examples: [
          { arabic: 'أَنَا (Anā)', transliteration: 'I', english: 'I (m/f)' },
          { arabic: 'أَنْتَ (Anta) / أَنْتِ (Anti)', transliteration: 'You (m) / You (f)', english: 'You (singular)' },
          { arabic: 'هُوَ (Huwa) / هِيَ (Hiya)', transliteration: 'He / She', english: 'He / She (it)' },
          { arabic: 'نَحْنُ (Naḥnu)', transliteration: 'We', english: 'We (m/f)' },
          { arabic: 'أَنْتُمْ (Antum) / هُمْ (Hum)', transliteration: 'You all (m) / They (m)', english: 'Plural masculine' }
        ]
      },
      {
        title: '2. Attached Possessive Suffixes (الضمائر المتصلة)',
        content: 'Attach these directly to the end of any noun to indicate possession (owner).',
        examples: [
          { arabic: 'كِتَابِي (Kitāb-ī)', transliteration: 'My book', english: 'Suffix: ـي (My)' },
          { arabic: 'كِتَابُكَ (Kitābu-ka) / كِتَابُكِ (Kitābu-ki)', transliteration: 'Your book (m) / (f)', english: 'Suffix: ـكَ / ـكِ (Your)' },
          { arabic: 'كِتَابُهُ (Kitābu-hu) / كِتَابُهَا (Kitābu-hā)', transliteration: 'His book / Her book', english: 'Suffix: ـهُ / ـهَا (His/Her)' },
          { arabic: 'كِتَابُنَا (Kitābu-nā)', transliteration: 'Our book', english: 'Suffix: ـنَا (Our)' }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you say "Our house" in Arabic?',
        options: ['بَيْتُنَا (Baytunā)', 'بَيْتِي (Baytī)', 'بَيْتُكَ (Baytuka)', 'بَيْتُهُمْ (Baytuhum)'],
        correctIndex: 0,
        explanation: 'The possessive suffix for "our" is ـنَا (-nā), making "Baytunā".'
      }
    ]
  },
  {
    id: 'grammar-4',
    titleEn: 'Demonstrative Pronouns (أسْمَاءُ الإِشَارَةِ)',
    titleAr: 'أَسْمَاءُ الإِشَارَةِ لِلْقَرِيبِ وَالبَعِيدِ',
    level: 'A1',
    summary: 'How to say "This", "That", "These", and "Those" in Arabic for masculine and feminine objects.',
    keyRule: 'هَذَا (This - m), هَذِهِ (This - f). Important: Non-human plurals are grammatically treated as singular feminine (هَذِهِ كُتُبٌ = These are books).',
    sections: [
      {
        title: '1. For Near Objects (للقريب)',
        content: 'Used when pointing to something close at hand.',
        examples: [
          { arabic: 'هَذَا كِتَابٌ (Hādhā kitāb)', transliteration: 'This is a book (m)', english: 'Masculine singular' },
          { arabic: 'هَذِهِ سَيَّارَةٌ (Hādhihi sayyārah)', transliteration: 'This is a car (f)', english: 'Feminine singular' },
          { arabic: 'هَذِهِ كُتُبٌ جَمِيلَةٌ (Hādhihi kutub)', transliteration: 'These are books', english: 'Non-human plural takes feminine singular!' }
        ]
      },
      {
        title: '2. For Distant Objects (للبعيد)',
        content: 'Used when pointing to something far away ("That").',
        examples: [
          { arabic: 'ذٰلِكَ مَسْجِدٌ (Dhālika masjid)', transliteration: 'That is a mosque (m)', english: 'Masculine far' },
          { arabic: 'تِلْكَ مَدِينَةٌ (Tilka madīnah)', transliteration: 'That is a city (f)', english: 'Feminine far' }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which demonstrative is used for "These cars" (سَيَّارَات)?',
        options: ['هَذِهِ (Hādhihi - non-human plural rule)', 'هَذَا (Hādhā)', 'ذٰلِكَ (Dhālika)', 'هُمْ'],
        correctIndex: 0,
        explanation: 'In Arabic, all non-human plural nouns are treated as feminine singular: "هَذِهِ سَيَّارَاتٌ".'
      }
    ]
  },
  {
    id: 'grammar-5',
    titleEn: 'Idāfah: The Possessive Construct (الإِضَافَةُ)',
    titleAr: 'الإِضَافَةُ: تَرْكِيبُ المِلْكِيَّةِ وَالنِّسْبَةِ',
    level: 'A2',
    summary: 'The elegant Arabic method to express "X of Y" (e.g., "The key of the house", "The city university") without using an English "of".',
    keyRule: 'First noun (المُضَاف): NO "Al-" and NO Tanween. Second noun (المُضَاف إِلَيْهِ): Takes "Al-" (if definite) and Kasra case.',
    sections: [
      {
        title: '1. Structure of Idāfah',
        content: 'Simply place the two nouns side by side. Word 1 is possessed, Word 2 is the possessor.',
        examples: [
          {
            arabic: 'كِتَابُ الطَّالِبِ',
            transliteration: 'Kitābuṭ-Ṭālib',
            english: 'The book of the student (The student’s book)',
            highlight: 'كِتَابُ (No Al) + الطَّالِبِ (With Al + Kasra)'
          },
          {
            arabic: 'بَابُ البَيْتِ',
            transliteration: 'Bābul-Bayt',
            english: 'The door of the house',
            highlight: 'بَابُ + البَيْتِ'
          },
          {
            arabic: 'مَدِينَةُ القَاهِرَةِ',
            transliteration: 'Madīnatu-l-Qāhirah',
            english: 'The city of Cairo',
            highlight: 'مَدِينَةُ + القَاهِرَةِ'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which is the grammatically correct Idāfah for "The key of the room"?',
        options: ['مِفْتَاحُ الغُرْفَةِ', 'المِفْتَاحُ الغُرْفَةِ', 'مِفْتَاحٌ الغُرْفَةَ', 'المِفْتَاحُ غُرْفَةٍ'],
        correctIndex: 0,
        explanation: 'The first word cannot have "Al-" and cannot have tanween: "مِفْتَاحُ الغُرْفَةِ".'
      }
    ]
  },
  {
    id: 'grammar-6',
    titleEn: 'Past Tense Conjugation (الفِعْلُ المَاضِي)',
    titleAr: 'تَصْرِيفُ الفِعْلِ المَاضِي مَعَ الضَّمَائِرِ',
    level: 'A2',
    summary: 'Conjugating 3-letter root verbs (فَعَلَ) in the past tense using suffix endings.',
    keyRule: 'In the past tense, subject markers are attached as SUFFIXES to the root (e.g., كَتَبْتُ = I wrote, كَتَبَ = He wrote, كَتَبْنَا = We wrote).',
    sections: [
      {
        title: '1. Past Suffix Matrix (Root: كَتَبَ - To Write)',
        content: 'Look at how the ending changes for each person:',
        examples: [
          { arabic: 'أَنَا كَتَبْتُ (Katab-tu)', transliteration: 'I wrote', english: 'Suffix: ـْتُ (-tu)' },
          { arabic: 'أَنْتَ كَتَبْتَ (Katab-ta)', transliteration: 'You wrote (m)', english: 'Suffix: ـْتَ (-ta)' },
          { arabic: 'أَنْتِ كَتَبْتِ (Katab-ti)', transliteration: 'You wrote (f)', english: 'Suffix: ـْتِ (-ti)' },
          { arabic: 'هُوَ كَتَبَ (Kataba)', transliteration: 'He wrote', english: 'Base 3-letter root form' },
          { arabic: 'هِيَ كَتَبَتْ (Katab-at)', transliteration: 'She wrote', english: 'Suffix: ـَتْ (-at)' },
          { arabic: 'نَحْنُ كَتَبْنَا (Katab-nā)', transliteration: 'We wrote', english: 'Suffix: ـْنَا (-nā)' },
          { arabic: 'هُمْ كَتَبُوا (Katab-ū)', transliteration: 'They wrote (m)', english: 'Suffix: ـُوا (-ū)' }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you say "I drank" from the verb شَرِبَ (Shariba)?',
        options: ['شَرِبْتُ (Sharib-tu)', 'شَرِبْتَ (Sharib-ta)', 'شَرِبْنَا (Sharib-nā)', 'يَشْرَبُ (Yashrabu)'],
        correctIndex: 0,
        explanation: 'For "I" in the past tense, attach the suffix ـْتُ (-tu): شَرِبْتُ.'
      }
    ]
  },
  {
    id: 'grammar-7',
    titleEn: 'Present Tense Conjugation (الفِعْلُ المُضَارِعُ)',
    titleAr: 'تَصْرِيفُ الفِعْلِ المُضَارِعِ مَعَ حُرُوفِ المُضَارَعَةِ',
    level: 'A2',
    summary: 'Master present tense verbs by applying prefix markers (أَ، تَ، يَ، نَ) and mood endings.',
    keyRule: 'Present tense verbs use prefixes: أ (I), ن (We), ي (He/They), ت (You/She).',
    sections: [
      {
        title: '1. Present Prefix Matrix (Root: دَرَسَ - To Study)',
        content: 'Prefixes indicate person, while suffixes indicate gender and number.',
        examples: [
          { arabic: 'أَنَا أَدْرُسُ (Adrusu)', transliteration: 'I study', english: 'Prefix: أ (A-)' },
          { arabic: 'أَنْتَ تَدْرُسُ (Tadrusu)', transliteration: 'You study (m)', english: 'Prefix: ت (Ta-)' },
          { arabic: 'أَنْتِ تَدْرُسِينَ (Tadrusīna)', transliteration: 'You study (f)', english: 'Prefix: ت + Suffix: ـِينَ' },
          { arabic: 'هُوَ يَدْرُسُ (Yadrusu)', transliteration: 'He studies', english: 'Prefix: ي (Ya-)' },
          { arabic: 'هِيَ تَدْرُسُ (Tadrusu)', transliteration: 'She studies', english: 'Prefix: ت (Ta-)' },
          { arabic: 'نَحْنُ نَدْرُسُ (Nadrusu)', transliteration: 'We study', english: 'Prefix: ن (Na-)' },
          { arabic: 'هُمْ يَدْرُسُونَ (Yadrusūna)', transliteration: 'They study (m)', english: 'Prefix: ي + Suffix: ـُونَ' }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which prefix is used for "We" (نَحْنُ) in the present tense?',
        options: ['نَـ (Na-)', 'أَ (A-)', 'يَـ (Ya-)', 'تَـ (Ta-)'],
        correctIndex: 0,
        explanation: 'The prefix for "We" (نحن) is Noon (نَـ), e.g., نَدْرُسُ (We study).'
      }
    ]
  },
  {
    id: 'grammar-8',
    titleEn: 'Noun-Adjective Agreement (المَوْصُوفُ وَالصِّفَةُ)',
    titleAr: 'المُطَابَقَةُ بَيْنَ الصِّفَةِ وَالمَوْصُوفِ',
    level: 'B1',
    summary: 'In Arabic, the adjective follows the noun and matches it in 4 distinct characteristics.',
    keyRule: 'An adjective must match its noun in: 1. Definiteness (Al-), 2. Gender (m/f), 3. Number (singular/plural), 4. Case ending (Damma/Fatha/Kasra).',
    sections: [
      {
        title: '1. The 4-Way Agreement Rule',
        content: 'Unlike English where the adjective comes first ("a big house"), Arabic puts the noun first and the adjective second ("a house big").',
        examples: [
          {
            arabic: 'بَيْتٌ كَبِيرٌ (Baytun kabīr)',
            transliteration: 'A big house',
            english: 'Both indefinite, singular, masculine'
          },
          {
            arabic: 'البَيْتُ الكَبِيرُ (Al-baytul-kabīr)',
            transliteration: 'The big house',
            english: 'Both definite (Al-), singular, masculine'
          },
          {
            arabic: 'سَيَّارَةٌ جَدِيدَةٌ (Sayyāratun jadīdah)',
            transliteration: 'A new car',
            english: 'Both indefinite, singular, feminine'
          },
          {
            arabic: 'السَّيَّارَةُ الجَدِيدَةُ (As-sayyāratul-jadīdah)',
            transliteration: 'The new car',
            english: 'Both definite, singular, feminine'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you correctly say "The new student (f)" in Arabic?',
        options: ['الطَّالِبَةُ الجَدِيدَةُ', 'طَالِبَةُ جَدِيدَةٌ', 'الطَّالِبَةُ جَدِيدٌ', 'طَالِبٌ جَدِيدَةٌ'],
        correctIndex: 0,
        explanation: 'Both the noun and adjective must have "Al-" and both must have the feminine "ـة": "الطَّالِبَةُ الجَدِيدَةُ".'
      }
    ]
  }
];

// Interactive verb conjugator database for live simulation
export interface ConjugationVerb {
  id: string;
  root: string;
  meaning: string;
  past: {
    ana: string;
    anta: string;
    anti: string;
    huwa: string;
    hiya: string;
    nahnu: string;
    antum: string;
    hum: string;
  };
  present: {
    ana: string;
    anta: string;
    anti: string;
    huwa: string;
    hiya: string;
    nahnu: string;
    antum: string;
    hum: string;
  };
  imperative: {
    anta: string;
    anti: string;
    antum: string;
  };
}

export const VERB_CONJUGATION_BANK: ConjugationVerb[] = [
  {
    id: 'kataba',
    root: 'ك - ت - ب',
    meaning: 'To Write (كَتَبَ)',
    past: {
      ana: 'كَتَبْتُ',
      anta: 'كَتَبْتَ',
      anti: 'كَتَبْتِ',
      huwa: 'كَتَبَ',
      hiya: 'كَتَبَتْ',
      nahnu: 'كَتَبْنَا',
      antum: 'كَتَبْتُمْ',
      hum: 'كَتَبُوا'
    },
    present: {
      ana: 'أَكْتُبُ',
      anta: 'تَكْتُبُ',
      anti: 'تَكْتُبِينَ',
      huwa: 'يَكْتُبُ',
      hiya: 'تَكْتُبُ',
      nahnu: 'نَكْتُبُ',
      antum: 'تَكْتُبُونَ',
      hum: 'يَكْتُبُونَ'
    },
    imperative: {
      anta: 'اُكْتُبْ',
      anti: 'اُكْتُبِي',
      antum: 'اُكْتُبُوا'
    }
  },
  {
    id: 'qaraa',
    root: 'ق - ر - أ',
    meaning: 'To Read (قَرَأَ)',
    past: {
      ana: 'قَرَأْتُ',
      anta: 'قَرَأْتَ',
      anti: 'قَرَأْتِ',
      huwa: 'قَرَأَ',
      hiya: 'قَرَأَتْ',
      nahnu: 'قَرَأْنَا',
      antum: 'قَرَأْتُمْ',
      hum: 'قَرَأُوا'
    },
    present: {
      ana: 'أَقْرَأُ',
      anta: 'تَقْرَأُ',
      anti: 'تَقْرَئِينَ',
      huwa: 'يَقْرَأُ',
      hiya: 'تَقْرَأُ',
      nahnu: 'نَقْرَأُ',
      antum: 'تَقْرَأُونَ',
      hum: 'يَقْرَأُونَ'
    },
    imperative: {
      anta: 'اِقْرَأْ',
      anti: 'اِقْرَئِي',
      antum: 'اِقْرَأُوا'
    }
  },
  {
    id: 'shariba',
    root: 'ش - ر - ب',
    meaning: 'To Drink (شَرِبَ)',
    past: {
      ana: 'شَرِبْتُ',
      anta: 'شَرِبْتَ',
      anti: 'شَرِبْتِ',
      huwa: 'شَرِبَ',
      hiya: 'شَرِبَتْ',
      nahnu: 'شَرِبْنَا',
      antum: 'شَرِبْتُمْ',
      hum: 'شَرِبُوا'
    },
    present: {
      ana: 'أَشْرَبُ',
      anta: 'تَشْرَبُ',
      anti: 'تَشْرَبِينَ',
      huwa: 'يَشْرَبُ',
      hiya: 'تَشْرَبُ',
      nahnu: 'نَشْرَبُ',
      antum: 'تَشْرَبُونَ',
      hum: 'يَشْرَبُونَ'
    },
    imperative: {
      anta: 'اِشْرَبْ',
      anti: 'اِشْرَبِي',
      antum: 'اِشْرَبُوا'
    }
  },
  {
    id: 'dhahaba',
    root: 'ذ - هـ - ب',
    meaning: 'To Go (ذَهَبَ)',
    past: {
      ana: 'ذَهَبْتُ',
      anta: 'ذَهَبْتَ',
      anti: 'ذَهَبْتِ',
      huwa: 'ذَهَبَ',
      hiya: 'ذَهَبَتْ',
      nahnu: 'ذَهَبْنَا',
      antum: 'ذَهَبْتُمْ',
      hum: 'ذَهَبُوا'
    },
    present: {
      ana: 'أَذْهَبُ',
      anta: 'تَذْهَبُ',
      anti: 'تَذْهَبِينَ',
      huwa: 'يَذْهَبُ',
      hiya: 'تَذْهَبُ',
      nahnu: 'نَذْهَبُ',
      antum: 'تَذْهَبُونَ',
      hum: 'يَذْهَبُونَ'
    },
    imperative: {
      anta: 'اِذْهَبْ',
      anti: 'اِذْهَبِي',
      antum: 'اِذْهَبُوا'
    }
  }
];
