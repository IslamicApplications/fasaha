export interface DictationItem {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const DICTATION_BANK: DictationItem[] = [
  { id: 'd-1', arabic: 'صَبَاحُ الخَيْرِ', transliteration: 'Ṣabāḥul-khayr', english: 'Good morning', level: 'beginner' },
  { id: 'd-2', arabic: 'كِتَابٌ مُفِيدٌ', transliteration: 'Kitābun mufīd', english: 'A useful book', level: 'beginner' },
  { id: 'd-3', arabic: 'أَنَا أَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ', transliteration: 'Anā ata‘allamul-lughatal-‘arabiyyah', english: 'I am learning the Arabic language', level: 'intermediate' },
  { id: 'd-4', arabic: 'الكِتَابُ خَيْرُ جَلِيسٍ فِي الزَّمَانِ', transliteration: 'Al-kitābu khayru jalīsin fīz-zamān', english: 'A book is the best companion in time', level: 'intermediate' },
  { id: 'd-5', arabic: 'مَنْ جَدَّ وَجَدَ وَمَنْ زَرَعَ حَصَدَ', transliteration: 'Man jadda wajada wa man zara‘a ḥaṣad', english: 'Whoever strives diligently succeeds', level: 'advanced' },
];
