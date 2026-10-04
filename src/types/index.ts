export type ModuleType = 
  | 'alphabet' 
  | 'vocabulary' 
  | 'reading_writing' 
  | 'morphology'
  | 'grammar' 
  | 'conversation' 
  | 'culture' 
  | 'practice';

export interface LetterForm {
  isolated: string;
  initial: string;
  medial: string;
  final: string;
}

export interface LetterVowels {
  fatha: string;
  fathaTranslit: string;
  damma: string;
  dammaTranslit: string;
  kasra: string;
  kasraTranslit: string;
  sukun: string;
  sukunTranslit: string;
}

export interface ArabicLetter {
  id: number;
  letter: string;
  nameEn: string;
  nameAr: string;
  transliteration: string;
  pronunciationGuide: string;
  makhraj: string; // Point of articulation
  isEmphatic: boolean;
  type: 'sun' | 'moon';
  isNonConnector: boolean; // Cannot connect to following letters (د، ذ، ر، ز، و، ا)
  forms: LetterForm;
  vowels: LetterVowels;
  exampleWord: {
    arabic: string;
    transliteration: string;
    english: string;
    position: 'initial' | 'medial' | 'final' | 'isolated';
  };
  strokeSvgPath?: string;
  svgViewBox?: string;
}

export interface HarakaItem {
  id: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  description: string;
  sound: string;
  sampleLetter: string;
  withSample: string;
  sampleTranslit: string;
}

export interface VocabWord {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'phrase' | 'particle';
  exampleSentence?: {
    arabic: string;
    transliteration: string;
    english: string;
  };
  plural?: string;
  audioText?: string;
}

export interface VocabCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  color: string;
  description: string;
}

export interface ReadingWord {
  arabic: string;
  transliteration: string;
  english: string;
  grammarNote?: string;
}

export interface ReadingSentence {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  words: ReadingWord[];
}

export interface ReadingPassage {
  id: string;
  titleAr: string;
  titleEn: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  summary: string;
  culturalNote?: string;
  sentences: ReadingSentence[];
  questions: {
    id: number;
    questionEn: string;
    questionAr: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface GrammarLesson {
  id: string;
  titleEn: string;
  titleAr: string;
  level: 'A1' | 'A2' | 'B1';
  summary: string;
  keyRule: string;
  sections: {
    title: string;
    content: string;
    examples: {
      arabic: string;
      transliteration: string;
      english: string;
      highlight?: string;
      breakdown?: { part: string; meaning: string }[];
    }[];
  }[];
  interactiveTool?: 'verb_conjugator' | 'gender_classifier' | 'sun_moon_sorter' | 'idafa_builder';
  quiz: {
    id: number;
    question: string;
    arabicText?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface DialogueLine {
  id: number;
  speaker: 'A' | 'B';
  speakerNameAr: string;
  speakerNameEn: string;
  arabic: string;
  transliteration: string;
  english: string;
  audioSpeed?: number;
  grammarTip?: string;
}

export interface ConversationDialogue {
  id: string;
  titleEn: string;
  titleAr: string;
  scenario: string;
  level: 'beginner' | 'intermediate';
  icon: string;
  speakerA: { name: string; avatar: string; role: string };
  speakerB: { name: string; avatar: string; role: string };
  dialogue: DialogueLine[];
  roleplayPrompt?: string;
}

export interface ProverbItem {
  id: string;
  arabic: string;
  transliteration: string;
  literalEnglish: string;
  englishMeaning: string;
  culturalContext: string;
  theme: string;
}

export interface CalligraphyStyle {
  id: string;
  nameEn: string;
  nameAr: string;
  originEra: string;
  characteristics: string[];
  sampleText: string;
  usage: string;
  fontClass: string;
  description: string;
}

export interface DialectComparison {
  id: string;
  meaningEn: string;
  msa: { arabic: string; translit: string };
  egyptian: { arabic: string; translit: string; note?: string };
  levantine: { arabic: string; translit: string; note?: string };
  gulf: { arabic: string; translit: string; note?: string };
  moroccan: { arabic: string; translit: string; note?: string };
}

export interface UserStats {
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLetters: number[];
  masteredVocab: string[];
  bookmarkedVocab: string[];
  completedReading: string[];
  completedGrammar: string[];
  completedDialogues: string[];
  highScores: Record<string, number>;
  unlockedBadges: string[];
}
