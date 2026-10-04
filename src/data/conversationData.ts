import { ConversationDialogue } from '../types';

export const CONVERSATION_DIALOGUES: ConversationDialogue[] = [
  {
    id: 'dialogue-1',
    titleEn: 'First Meeting & Introductions',
    titleAr: 'التَّعَارُفُ وَالتَّحِيَّةُ الأُولَى',
    scenario: 'Two students meeting for the first time on university campus.',
    level: 'beginner',
    icon: 'Users',
    speakerA: { name: 'Tariq (طَارِق)', avatar: '👨‍🎓', role: 'Student A' },
    speakerB: { name: 'Layla (لَيْلَى)', avatar: '👩‍🎓', role: 'Student B' },
    roleplayPrompt: 'Practice introducing yourself, asking where someone is from, and exchanging polite pleasantries.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'طَارِق',
        speakerNameEn: 'Tariq',
        arabic: 'السَّلاَمُ عَلَيْكُمْ! أَنَا طَارِق، مَا اسْمُكِ؟',
        transliteration: 'As-salāmu ‘alaykum! Anā Ṭāriq, masmuki?',
        english: 'Peace be upon you! I am Tariq, what is your name?',
        grammarTip: 'Notice the question particle "مَا اسْمُكِ" (f) with Kasra ending for addressing a female.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'لَيْلَى',
        speakerNameEn: 'Layla',
        arabic: 'وَعَلَيْكُمُ السَّلاَمُ! اسْمِي لَيْلَى، تَشَرَّفْنَا يَا طَارِق.',
        transliteration: 'Wa ‘alaykumus-salām! Ismī Laylā, tasharrafnā yā Ṭāriq.',
        english: 'And upon you be peace! My name is Layla, pleased to meet you, Tariq.',
        grammarTip: '«تَشَرَّفْنَا» (Tasharrafnā) literally means "We are honored" = Nice to meet you.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'طَارِق',
        speakerNameEn: 'Tariq',
        arabic: 'الشَّرَفُ لِي. مِنْ أَيْنَ أَنْتِ يَا لَيْلَى؟',
        transliteration: 'Ash-sharafu lī. Min ayna anti yā Laylā?',
        english: 'The honor is mine. Where are you from, Layla?',
        grammarTip: '«مِنْ أَيْنَ» (Min ayna) = Where from?'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'لَيْلَى',
        speakerNameEn: 'Layla',
        arabic: 'أَنَا مِنَ الأُرْدُنِّ، وَأَنْتَ؟ هَلْ أَنْتَ مِنْ هُنَا؟',
        transliteration: 'Anā minal-Urdun, wa anta? Hal anta min hunā?',
        english: 'I am from Jordan, and you? Are you from here?',
        grammarTip: '«هَلْ» (Hal) turns any sentence into a Yes/No question.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'طَارِق',
        speakerNameEn: 'Tariq',
        arabic: 'نَعَمْ، أَنَا مِنْ هُنَا، وَأَدْرُسُ الهَنْدَسَةَ.',
        transliteration: 'Na‘am, anā min hunā, wa adrusul-handasah.',
        english: 'Yes, I am from here, and I study engineering.',
        grammarTip: '«أَدْرُسُ» (Adrusu) = I study (Present tense with Alif prefix).'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'لَيْلَى',
        speakerNameEn: 'Layla',
        arabic: 'مُمْتَازٌ! أَتَمَنَّى لَكَ النَّجَاحَ، إِلَى اللِّقَاءِ.',
        transliteration: 'Mumtāz! Atamannā lakan-najāḥ, ilal-liqā’.',
        english: 'Excellent! I wish you success, see you later.',
        grammarTip: '«إِلَى اللِّقَاءِ» (Ilal-liqā’) = Until the meeting (Goodbye).'
      }
    ]
  },
  {
    id: 'dialogue-2',
    titleEn: 'Ordering at a Traditional Café',
    titleAr: 'فِي المَقْهَى التَّقْلِيدِيِّ',
    scenario: 'A customer ordering Arabic coffee and fresh mint tea from a café waiter.',
    level: 'beginner',
    icon: 'Coffee',
    speakerA: { name: 'Waiter (النَّادِل)', avatar: '🧑‍🍳', role: 'Server' },
    speakerB: { name: 'Customer (الزَّبُون)', avatar: '🧔', role: 'Guest' },
    roleplayPrompt: 'Practice requesting items politely using «لَوْ سَمَحْتَ» (please) and specifying sugar preferences.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'مَرْحَبًا بِكَ يَا سَيِّدِي! مَاذَا تُحِبُّ أَنْ تَشْرَبَ؟',
        transliteration: 'Marḥaban bika yā sayyidī! Mādhā tuḥibbu an tashrab?',
        english: 'Welcome sir! What would you like to drink?',
        grammarTip: '«مَاذَا تُحِبُّ أَنْ...» = What would you like to...'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'الزَّبُون',
        speakerNameEn: 'Customer',
        arabic: 'أَهْلاً بِكَ. أُرِيدُ فِنْجَانَ قَهْوَةٍ عَرَبِيَّةٍ، لَوْ سَمَحْتَ.',
        transliteration: 'Ahlan bik. Urīdu finjāna qahwatin ‘arabiyyah, law samaḥt.',
        english: 'Hello. I would like a cup of Arabic coffee, please.',
        grammarTip: '«لَوْ سَمَحْتَ» (Law samaḥta) = If you permit / Please.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'كَيْفَ تُفَضِّلُ السُّكَّرَ؟ هَلْ مَعَ سُكَّرٍ قَلِيلٍ أَمْ زِيَادَة؟',
        transliteration: 'Kayfa tufaḍḍilus-sukkar? Hal ma‘a sukkarin qalīlin am ziyādah?',
        english: 'How do you prefer the sugar? With a little sugar or extra?',
        grammarTip: '«أَمْ» (Am) means "or" exclusively in interrogative choices.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'الزَّبُون',
        speakerNameEn: 'Customer',
        arabic: 'سُكَّرٌ وَسَطٌ، وَهَلْ عِنْدَكُمْ حَلْوَى شَرْقِيَّةٌ؟',
        transliteration: 'Sukkarun wasaṭ, wa hal ‘indakum ḥalwā sharqiyyah?',
        english: 'Medium sugar, and do you have oriental sweets (Baklava)?',
        grammarTip: '«سُكَّر وَسَط» (Sukkar wasat) = Medium sweet coffee.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'نَعَمْ، عِنْدَنَا بَقْلاَوَةٌ طَازَجَةٌ وَلَذِيذَةٌ جِدًّا. حَالاً سَأُحْضِرُهَا.',
        transliteration: 'Na‘am, ‘indanā baqlāwah ṭāzajah wa ladhīdhah jiddan. Ḥālan sa’uḥḍiruhā.',
        english: 'Yes, we have very fresh and delicious Baklava. I will bring it right away.',
        grammarTip: '«سَـ» (Sa-) prefix expresses immediate future tense.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'الزَّبُون',
        speakerNameEn: 'Customer',
        arabic: 'شُكْرًا جَزِيلاً لَكَ، جَزَاكَ اللهُ خَيْرًا.',
        transliteration: 'Shukran jazīlan lak, jazākallāhu khayrā.',
        english: 'Thank you very much, may God reward you with good.',
        grammarTip: 'A traditional and polite closing for everyday service.'
      }
    ]
  },
  {
    id: 'dialogue-3',
    titleEn: 'Bargaining & Shopping in the Souq',
    titleAr: 'التَّسَوُّقُ وَالشِّرَاءُ فِي السُّوقِ',
    scenario: 'Negotiating price and asking for traditional souvenirs.',
    level: 'intermediate',
    icon: 'ShoppingBag',
    speakerA: { name: 'Shopkeeper (البَائِع)', avatar: '👳‍♂️', role: 'Merchant' },
    speakerB: { name: 'Shopper (المُشْتَرِي)', avatar: '🧕', role: 'Buyer' },
    roleplayPrompt: 'Practice asking prices with «بِكَمْ هَذَا؟» (How much is this?) and negotiating discounts.',
    dialogue: [
      {
        id: 1,
        speaker: 'B',
        speakerNameAr: 'المُشْتَرِي',
        speakerNameEn: 'Shopper',
        arabic: 'السَّلاَمُ عَلَيْكُمْ، بِكَمْ هَذَا السِّجَّادُ اليَدَوِيُّ الجَمِيلُ؟',
        transliteration: 'As-salāmu ‘alaykum, bikam hādhās-sijjādul-yadawiyyul-jamīl?',
        english: 'Peace be upon you, how much is this beautiful handmade rug?',
        grammarTip: '«بِكَمْ» (Bikam) = How much does it cost?'
      },
      {
        id: 2,
        speaker: 'A',
        speakerNameAr: 'البَائِع',
        speakerNameEn: 'Shopkeeper',
        arabic: 'أَهْلاً وَسَهْلاً! هَذَا حَرِيرٌ أَصْلِيٌّ، سِعْرُهُ مِائَةُ دِينَارٍ فَقَطْ.',
        transliteration: 'Ahlan wa sahlan! Hādhā ḥarīrun aṣlī, si‘ruhu mi’atu dīnārin faqaṭ.',
        english: 'Welcome! This is authentic silk, its price is 100 Dinars only.',
        grammarTip: '«فَقَطْ» (Faqaṭ) = Only / Just.'
      },
      {
        id: 3,
        speaker: 'B',
        speakerNameAr: 'المُشْتَرِي',
        speakerNameEn: 'Shopper',
        arabic: 'هَذَا غَالٍ كَثِيرًا! هَلْ يُمْكِنُ أَنْ تُعْطِيَنِي سِعْرًا أَفْضَلَ؟',
        transliteration: 'Hādhā ghālin kathīrā! Hal yumkinu an tu‘ṭiyanī si‘ran afḍal?',
        english: 'That is very expensive! Could you give me a better price?',
        grammarTip: '«غَالٍ» (Ghālin) = Expensive, «أَفْضَل» (Afḍal) = Better.'
      },
      {
        id: 4,
        speaker: 'A',
        speakerNameAr: 'البَائِع',
        speakerNameEn: 'Shopkeeper',
        arabic: 'لِأَنَّكِ ضَيْفَةٌ كَرِيمَةٌ، سَأَجْعَلُهُ بِثَمَانِينَ دِينَارًا!',
        transliteration: 'Li’annaki ḍayfatun karīmah, sa’aj‘aluhu bithamānīna dīnārā!',
        english: 'Because you are an esteemed guest, I will make it 80 Dinars!',
        grammarTip: 'Bargaining is viewed as a friendly social rapport in Arab souqs.'
      },
      {
        id: 5,
        speaker: 'B',
        speakerNameAr: 'المُشْتَرِي',
        speakerNameEn: 'Shopper',
        arabic: 'اتَّفَقْنَا! سَآخُذُهُ، شُكْرًا لَكَ عَلَى كَرَمِكَ.',
        transliteration: 'Ittafaqnā! Sa’ākhudhuh, shukran laka ‘alā karamik.',
        english: 'Agreed! I will take it, thank you for your generosity.',
        grammarTip: '«اتَّفَقْنَا» (Ittafaqnā) = We have agreed / It is a deal!'
      }
    ]
  }
];
