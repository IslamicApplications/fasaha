export interface MorphWordDerivative {
  patternName: string; // e.g., 'فَاعِل (Doer / Active Participle)'
  patternScale: string; // 'فَاعِل'
  arabic: string; // 'كَاتِبٌ'
  transliteration: string; // 'Kātib'
  english: string; // 'Writer / Author'
  type: 'verb' | 'noun' | 'adjective' | 'place' | 'tool' | 'gerund';
  explanation: string;
}

export interface ArabicRoot {
  id: string;
  rootAr: string; // 'ك - ت - ب'
  rootLetters: [string, string, string]; // ['ك', 'ت', 'ب']
  primaryMeaning: string; // 'Writing / Inscribing'
  derivatives: MorphWordDerivative[];
}

export const ARABIC_ROOTS: ArabicRoot[] = [
  {
    id: 'k-t-b',
    rootAr: 'ك - ت - ب',
    rootLetters: ['ك', 'ت', 'ب'],
    primaryMeaning: 'Writing, books, and recording',
    derivatives: [
      {
        patternName: 'فَعَلَ (Past Base Verb)',
        patternScale: 'فَعَلَ',
        arabic: 'كَتَبَ',
        transliteration: 'Kataba',
        english: 'He wrote',
        type: 'verb',
        explanation: 'The fundamental 3-letter base verb indicating the past action.'
      },
      {
        patternName: 'فَاعِل (Active Participle / Doer)',
        patternScale: 'فَاعِل',
        arabic: 'كَاتِبٌ',
        transliteration: 'Kātib',
        english: 'Writer / Author / Clerk',
        type: 'noun',
        explanation: 'Inserting Alif after the 1st root letter creates the person performing the action.'
      },
      {
        patternName: 'مَفْعُول (Passive Participle / Receiver)',
        patternScale: 'مَفْعُول',
        arabic: 'مَكْتُوبٌ',
        transliteration: 'Maktūb',
        english: 'Written / Letter / Destiny',
        type: 'adjective',
        explanation: 'Prefixing Meem (مَـ) and infixing Waw (ـوـ) creates the entity upon which the action occurred.'
      },
      {
        patternName: 'مَفْعَل / مَفْعَلَة (Noun of Place)',
        patternScale: 'مَفْعَلَة',
        arabic: 'مَكْتَبَةٌ / مَكْتَبٌ',
        transliteration: 'Maktabah / Maktab',
        english: 'Library / Desk / Office',
        type: 'place',
        explanation: 'Prefixing Meem creates the location where writing takes place.'
      },
      {
        patternName: 'فِعَال (Object Noun)',
        patternScale: 'فِعَال',
        arabic: 'كِتَابٌ',
        transliteration: 'Kitāb',
        english: 'Book',
        type: 'noun',
        explanation: 'Vowel pattern creates the physical receptacle of writing.'
      },
      {
        patternName: 'فِعَالَة (Profession / Craft)',
        patternScale: 'فِعَالَة',
        arabic: 'كِتَابَةٌ',
        transliteration: 'Kitābah',
        english: 'The art/act of writing',
        type: 'gerund',
        explanation: 'Suffixing Ta Marbutah creates the formal craft or abstract concept.'
      },
      {
        patternName: 'اِسْتِفْعَال (Form X: Requesting / Seeking)',
        patternScale: 'اِسْتِفْعَال',
        arabic: 'اِسْتِكْتَابٌ',
        transliteration: 'Istiktāb',
        english: 'Dictation / Requesting to write',
        type: 'gerund',
        explanation: 'Prefixing Ist- (اِسْتـ) indicates requesting or seeking the root action.'
      }
    ]
  },
  {
    id: 'd-r-s',
    rootAr: 'د - ر - س',
    rootLetters: ['د', 'ر', 'س'],
    primaryMeaning: 'Studying, learning, and instruction',
    derivatives: [
      {
        patternName: 'فَعَلَ (Past Base Verb)',
        patternScale: 'فَعَلَ',
        arabic: 'دَرَسَ',
        transliteration: 'Darasa',
        english: 'He studied',
        type: 'verb',
        explanation: 'Base past verb of studying.'
      },
      {
        patternName: 'فَعَّلَ (Form II: Causative / Intensive)',
        patternScale: 'فَعَّلَ',
        arabic: 'دَرَّسَ',
        transliteration: 'Darrasa',
        english: 'He taught (caused to study)',
        type: 'verb',
        explanation: 'Doubling the middle root letter (Shaddah) turns studying into teaching!'
      },
      {
        patternName: 'فِعْل (Noun)',
        patternScale: 'فَعْل',
        arabic: 'دَرْسٌ',
        transliteration: 'Dars',
        english: 'Lesson / Lecture',
        type: 'noun',
        explanation: 'The individual unit of study.'
      },
      {
        patternName: 'مُفَعِّل (Form II Active Participle)',
        patternScale: 'مُفَعِّل',
        arabic: 'مُدَرِّسٌ',
        transliteration: 'Mudarris',
        english: 'Teacher / Instructor',
        type: 'noun',
        explanation: 'The person who teaches.'
      },
      {
        patternName: 'مَفْعَلَة (Noun of Place)',
        patternScale: 'مَفْعَلَة',
        arabic: 'مَدْرَسَةٌ',
        transliteration: 'Madrasah',
        english: 'School',
        type: 'place',
        explanation: 'The building/place where studying happens.'
      },
      {
        patternName: 'فِعَالَة (Academic Field)',
        patternScale: 'فِعَالَة',
        arabic: 'دِرَاسَةٌ',
        transliteration: 'Dirāsah',
        english: 'Studies / Academic research',
        type: 'gerund',
        explanation: 'The broad domain of learning.'
      }
    ]
  },
  {
    id: 's-l-m',
    rootAr: 'س - ل - م',
    rootLetters: ['س', 'ل', 'م'],
    primaryMeaning: 'Peace, safety, wholeness, and submission',
    derivatives: [
      {
        patternName: 'فَعَال (Noun of State)',
        patternScale: 'فَعَال',
        arabic: 'سَلاَمٌ',
        transliteration: 'Salām',
        english: 'Peace / Tranquility',
        type: 'noun',
        explanation: 'Universal greeting and state of serenity.'
      },
      {
        patternName: 'أَفْعَلَ (Form IV: Causative)',
        patternScale: 'أَفْعَلَ',
        arabic: 'أَسْلَمَ',
        transliteration: 'Aslama',
        english: 'He embraced Islam / surrendered in peace',
        type: 'verb',
        explanation: 'Form IV indicates entering into a state of safety and peace.'
      },
      {
        patternName: 'إِفْعَال (Form IV Verbal Noun)',
        patternScale: 'إِفْعَال',
        arabic: 'إِسْلاَمٌ',
        transliteration: 'Islām',
        english: 'Islam (Submission to the Divine in Peace)',
        type: 'noun',
        explanation: 'The formal theological and spiritual concept.'
      },
      {
        patternName: 'مُفْعِل (Form IV Participle)',
        patternScale: 'مُفْعِل',
        arabic: 'مُسْلِمٌ',
        transliteration: 'Muslim',
        english: 'Muslim (One who submits in peace)',
        type: 'noun',
        explanation: 'The practitioner of Islam.'
      },
      {
        patternName: 'فَعِيل (Adjective of Quality)',
        patternScale: 'فَعِيل',
        arabic: 'سَلِيمٌ',
        transliteration: 'Salīm',
        english: 'Sound / Healthy / Flawless',
        type: 'adjective',
        explanation: 'Describes a pure heart or uncorrupted mind (قَلْبٌ سَلِيم).'
      }
    ]
  },
  {
    id: 'a-l-m',
    rootAr: 'ع - ل - م',
    rootLetters: ['ع', 'ل', 'م'],
    primaryMeaning: 'Knowing, knowledge, and science',
    derivatives: [
      {
        patternName: 'فَعِلَ (Base Verb)',
        patternScale: 'فَعِلَ',
        arabic: 'عَلِمَ',
        transliteration: '‘Alima',
        english: 'He knew / recognized',
        type: 'verb',
        explanation: 'The base verb for cognition.'
      },
      {
        patternName: 'فِعْل (Noun of Knowledge)',
        patternScale: 'فِعْل',
        arabic: 'عِلْمٌ',
        transliteration: '‘Ilm',
        english: 'Knowledge / Science',
        type: 'noun',
        explanation: 'Scholarship and understanding.'
      },
      {
        patternName: 'فَاعِل (Doer)',
        patternScale: 'فَاعِل',
        arabic: 'عَالِمٌ',
        transliteration: '‘Ālim',
        english: 'Scholar / Scientist',
        type: 'noun',
        explanation: 'One possessing deep knowledge.'
      },
      {
        patternName: 'مُفَعِّل (Teacher)',
        patternScale: 'مُفَعِّل',
        arabic: 'مُعَلِّمٌ',
        transliteration: 'Mu‘allim',
        english: 'Teacher / Educator',
        type: 'noun',
        explanation: 'One who imparts knowledge to others.'
      },
      {
        patternName: 'تَفْعِيل (Process of Instruction)',
        patternScale: 'تَفْعِيل',
        arabic: 'تَعْلِيمٌ',
        transliteration: 'Ta‘līm',
        english: 'Education / Instruction',
        type: 'gerund',
        explanation: 'The educational system.'
      },
      {
        patternName: 'فَعَل (Sign / Universe)',
        patternScale: 'فَعَل',
        arabic: 'عَالَمٌ',
        transliteration: '‘Ālam',
        english: 'World / Universe',
        type: 'noun',
        explanation: 'The cosmos as a sign of knowledge.'
      }
    ]
  }
];

export const ROOT_QUIZ_QUESTIONS = [
  {
    id: 1,
    word: 'مَكْتَبَةٌ (Maktabah - Library)',
    options: ['ك - ت - ب', 'م - ك - ت', 'ك - ب - ت', 'ب - ت - ك'],
    correct: 0,
    explanation: 'Stripping the prefix (مـ) and suffix (ـة) reveals the 3-letter root ك - ت - ب (Writing).'
  },
  {
    id: 2,
    word: 'مُعَلِّمٌ (Mu‘allim - Teacher)',
    options: ['ع - ل - م', 'م - ع - ل', 'ع - م - ل', 'ل - ع - م'],
    correct: 0,
    explanation: 'Stripping the prefix (مـ) and doubling reveals the root ع - ل - م (Knowledge).'
  },
  {
    id: 3,
    word: 'مَدْرَسَةٌ (Madrasah - School)',
    options: ['د - ر - س', 'م - د - ر', 'ر - د - س', 'س - ر - د'],
    correct: 0,
    explanation: 'The place of studying is derived from د - ر - س (Studying).'
  },
  {
    id: 4,
    word: 'إِسْلاَمٌ (Islām)',
    options: ['س - ل - م', 'أ - س - ل', 'س - م - ل', 'ل - س - م'],
    correct: 0,
    explanation: 'Islām is on the scale of إِفْعَال from the root س - ل - م (Peace and surrender).'
  }
];
