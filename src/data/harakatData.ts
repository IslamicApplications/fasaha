import { HarakaItem } from '../types';

export const HARAKAT_DATA: HarakaItem[] = [
  {
    id: 'fatha',
    nameAr: 'فَتْحَة',
    nameEn: 'Fatḥah',
    symbol: 'َ',
    description: 'A small diagonal stroke above the letter. Produces a short "a" sound (like "u" in "cup" or "a" in "cat").',
    sound: 'Short "a"',
    sampleLetter: 'ب',
    withSample: 'بَ',
    sampleTranslit: 'Ba'
  },
  {
    id: 'damma',
    nameAr: 'ضَمَّة',
    nameEn: 'Ḍammah',
    symbol: 'ُ',
    description: 'A miniature Waw above the letter. Produces a short "u" / "o" sound (like "u" in "put").',
    sound: 'Short "u"',
    sampleLetter: 'ب',
    withSample: 'بُ',
    sampleTranslit: 'Bu'
  },
  {
    id: 'kasra',
    nameAr: 'كَسْرَة',
    nameEn: 'Kasrah',
    symbol: 'ِ',
    description: 'A small diagonal stroke below the letter. Produces a short "i" sound (like "i" in "sit").',
    sound: 'Short "i"',
    sampleLetter: 'ب',
    withSample: 'بِ',
    sampleTranslit: 'Bi'
  },
  {
    id: 'sukun',
    nameAr: 'سُكُون',
    nameEn: 'Sukūn',
    symbol: 'ْ',
    description: 'A small circle above the letter indicating absence of any vowel (a pure consonant stop).',
    sound: 'Vowelless consonant stop',
    sampleLetter: 'ب',
    withSample: 'بْ',
    sampleTranslit: 'B'
  },
  {
    id: 'shaddah',
    nameAr: 'شَدَّة',
    nameEn: 'Shaddah',
    symbol: 'ّ',
    description: 'A "w" shaped mark above the letter indicating a doubled (geminated) consonant pronounced with emphasis and hold.',
    sound: 'Doubled consonant (e.g. bb)',
    sampleLetter: 'ب',
    withSample: 'بَّ',
    sampleTranslit: 'Bba'
  },
  {
    id: 'tanween_fath',
    nameAr: 'تَنْوِين فَتْح',
    nameEn: 'Tanwīn Fatḥ',
    symbol: 'ً',
    description: 'Double Fatha at the end of indefinite nouns, pronounced as "-an" (often with an Alif support).',
    sound: 'Ending sound "-an"',
    sampleLetter: 'ب',
    withSample: 'بًا',
    sampleTranslit: 'Ban'
  },
  {
    id: 'tanween_damm',
    nameAr: 'تَنْوِين ضَمّ',
    nameEn: 'Tanwīn Ḍamm',
    symbol: 'ٌ',
    description: 'Double Damma at the end of indefinite nominative nouns, pronounced as "-un".',
    sound: 'Ending sound "-un"',
    sampleLetter: 'ب',
    withSample: 'بٌ',
    sampleTranslit: 'Bun'
  },
  {
    id: 'tanween_kasr',
    nameAr: 'تَنْوِين كَسْر',
    nameEn: 'Tanwīn Kasr',
    symbol: 'ٍ',
    description: 'Double Kasra beneath the end of indefinite genitive nouns, pronounced as "-in".',
    sound: 'Ending sound "-in"',
    sampleLetter: 'ب',
    withSample: 'بٍ',
    sampleTranslit: 'Bin'
  },
  {
    id: 'maddah',
    nameAr: 'مَدَّة',
    nameEn: 'Maddah',
    symbol: 'آ',
    description: 'A wavy line over Alif (آ) representing a Hamza followed by a long Alif, pronounced as a lengthened "āā".',
    sound: 'Long "āā"',
    sampleLetter: 'آ',
    withSample: 'آ',
    sampleTranslit: '’Ā'
  }
];
