import { ConversationDialogue } from '../types';

export const CONVERSATION_DIALOGUES: ConversationDialogue[] = [
  {
    id: 'dialogue-1',
    titleEn: 'First Meeting & Introductions',
    titleAr: 'التَّعَارُفُ وَالتَّحِيَّةُ الأُولَى',
    category: 'Daily Life',
    scenario: 'Two students meeting for the first time on university campus in Amman.',
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
        arabic: 'نَعَمْ، أَنَا مِنْ هُنَا، وَأَدْرُسُ الهَنْدَسَةَ فِي هَذِهِ الجَامِعَةِ.',
        transliteration: 'Na‘am, anā min hunā, wa adrusul-handasata fī hādhihil-jāmi‘ah.',
        english: 'Yes, I am from here, and I study engineering at this university.',
        grammarTip: '«أَدْرُسُ» (Adrusu) = I study (Present tense with Alif prefix).'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'لَيْلَى',
        speakerNameEn: 'Layla',
        arabic: 'مُمْتَازٌ! أَتَمَنَّى لَكَ النَّجَاحَ وَالتَّوْفِيقَ، إِلَى اللِّقَاءِ.',
        transliteration: 'Mumtāz! Atamannā lakan-najāḥa wat-tawfīq, ilal-liqā’.',
        english: 'Excellent! I wish you success and good fortune, see you later.',
        grammarTip: '«إِلَى اللِّقَاءِ» (Ilal-liqā’) = Until the meeting (Goodbye).'
      }
    ]
  },
  {
    id: 'dialogue-2',
    titleEn: 'Ordering at a Traditional Café',
    titleAr: 'فِي المَقْهَى التَّقْلِيدِيِّ',
    category: 'Food & Dining',
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
        arabic: 'أَهْلاً بِكَ. أُرِيدُ فِنْجَانَ قَهْوَةٍ عَرَبِيَّةٍ بِالهَيْلِ، لَوْ سَمَحْتَ.',
        transliteration: 'Ahlan bik. Urīdu finjāna qahwatin ‘arabiyyatin bil-hayl, law samaḥt.',
        english: 'Hello. I would like a cup of Arabic coffee with cardamom, please.',
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
        arabic: 'سُكَّرٌ وَسَطٌ، وَهَلْ عِنْدَكُمْ حَلْوَى شَرْقِيَّةٌ أَيْضًا؟',
        transliteration: 'Sukkarun wasaṭ, wa hal ‘indakum ḥalwā sharqiyyatun ayḍan?',
        english: 'Medium sugar, and do you have oriental sweets (Baklava) as well?',
        grammarTip: '«سُكَّر وَسَط» (Sukkar wasat) = Medium sweet coffee.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'نَعَمْ، عِنْدَنَا بَقْلاَوَةٌ طَازَجَةٌ وَلَذِيذَةٌ جِدًّا. حَالاً سَأُحْضِرُهَا لَكَ.',
        transliteration: 'Na‘am, ‘indanā baqlāwatun ṭāzajatun wa ladhīdhatun jiddan. Ḥālan sa’uḥḍiruhā lak.',
        english: 'Yes, we have very fresh and delicious Baklava. I will bring it right away for you.',
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
    titleEn: 'Asking for Directions in the Old City',
    titleAr: 'السُّؤَالُ عَنِ الِاتِّجَاهَاتِ وَالطَّرِيقِ',
    category: 'Travel & Navigation',
    scenario: 'A lost tourist asking a local resident for directions to the historical Grand Mosque.',
    level: 'beginner',
    icon: 'Compass',
    speakerA: { name: 'Tourist (السَّائِح)', avatar: '🧭', role: 'Lost Traveler' },
    speakerB: { name: 'Local Resident (المُوَاطِن)', avatar: '🧓', role: 'City Resident' },
    roleplayPrompt: 'Practice directional phrases: straight ahead (إِلَى الأَمَامِ), turn right (انْعَطِفْ يَمِينًا), and near (قَرِيبٌ مِنْ).',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'السَّائِح',
        speakerNameEn: 'Tourist',
        arabic: 'عَفْوًا يَا أَخِي، أَيْنَ المَسْجِدُ الكَبِيرُ مِنْ هُنَا؟',
        transliteration: '‘Afwan yā akhī, aynal-masjidul-kabīru min hunā?',
        english: 'Excuse me brother, where is the Grand Mosque from here?',
        grammarTip: '«عَفْوًا» (Afwan) is used for "Excuse me" or "You are welcome".'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'المُوَاطِن',
        speakerNameEn: 'Resident',
        arabic: 'أَهْلاً بِكَ! المَسْجِدُ قَرِيبٌ جِدًّا، يُمْكِنُكَ المَشْيُ إِلَيْهِ.',
        transliteration: 'Ahlan bik! Al-masjidu qarībun jiddan, yumkinukal-mashyu ilayh.',
        english: 'Welcome! The mosque is very close, you can walk to it.',
        grammarTip: '«قَرِيبٌ مِنْ» = Close to / Near.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'السَّائِح',
        speakerNameEn: 'Tourist',
        arabic: 'كَيْفَ أَصِلُ إِلَيْهِ بِالتَّحْدِيدِ؟',
        transliteration: 'Kayfa aṣilu ilayhi bit-taḥdīd?',
        english: 'How do I reach it specifically?',
        grammarTip: '«بِالتَّحْدِيد» (Bit-tahdīd) = Exactly / Specifically.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'المُوَاطِن',
        speakerNameEn: 'Resident',
        arabic: 'امْشِ إِلَى الأَمَامِ مُبَاشَرَةً، ثُمَّ انْعَطِفْ يَمِينًا عِنْدَ سُوقِ التَّوَابِلِ.',
        transliteration: 'Imshi ilal-amāmi mubāsharatan, thumman-‘aṭif yamīnan ‘inda sūqit-tawābil.',
        english: 'Walk straight ahead, then turn right at the spice market.',
        grammarTip: '«امْشِ» (Imshi) is the imperative command "Walk!".'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'السَّائِح',
        speakerNameEn: 'Tourist',
        arabic: 'هَلْ هُوَ عَلَى اليَمِينِ أَمْ عَلَى اليَسَارِ؟',
        transliteration: 'Hal huwa ‘alal-yamīni am ‘alal-yasār?',
        english: 'Is it on the right or on the left?',
        grammarTip: '«عَلَى اليَمِينِ» = On the right; «عَلَى اليَسَارِ» = On the left.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'المُوَاطِن',
        speakerNameEn: 'Resident',
        arabic: 'سَتَرَاهُ عَلَى يَسَارِكَ أَمَامَ المَيْدَانِ الرَّئِيسِيِّ. رِحْلَةً مُوَفَّقَةً!',
        transliteration: 'Satarāhu ‘alā yasārika amāmal-maydānir-ra’īsī. Riḥlatan muwaffaqah!',
        english: 'You will see it on your left in front of the main square. Have a good journey!',
        grammarTip: '«أَمَامَ» (Amāma) is an adverb of place meaning "in front of".'
      }
    ]
  },
  {
    id: 'dialogue-4',
    titleEn: 'Taking a Taxi in Cairo',
    titleAr: 'رُكُوبُ سَيَّارَةِ الأُجْرَةِ (التَّاكْسِي)',
    category: 'Travel & Navigation',
    scenario: 'Hailing a taxi in downtown Cairo and giving clear drop-off directions.',
    level: 'beginner',
    icon: 'Car',
    speakerA: { name: 'Passenger (الرَّاكِب)', avatar: '🧳', role: 'Commuter' },
    speakerB: { name: 'Taxi Driver (السَّائِق)', avatar: '🚕', role: 'Driver' },
    roleplayPrompt: 'Practice telling a driver your destination and asking to run the meter or stop safely.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'الرَّاكِب',
        speakerNameEn: 'Passenger',
        arabic: 'السَّلاَمُ عَلَيْكُمْ، هَلْ أَنْتَ فَارِغٌ يَا أُسْتَاذُ؟',
        transliteration: 'As-salāmu ‘alaykum, hal anta fārighun yā ustādh?',
        english: 'Peace be upon you, are you available/free sir?',
        grammarTip: '«فَارِغ» (Fārigh) = Empty/Free. «أُسْتَاذ» is a polite title for strangers.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'السَّائِق',
        speakerNameEn: 'Driver',
        arabic: 'وَعَلَيْكُمُ السَّلاَمُ، تَفَضَّلْ بِالرُّكُوبِ! إِلَى أَيْنَ الوُجْهَةُ؟',
        transliteration: 'Wa ‘alaykumus-salām, tafaḍḍal bir-rukūb! Ilā aynal-wujhah?',
        english: 'And upon you be peace, please step in! What is the destination?',
        grammarTip: '«تَفَضَّلْ» (Tafaddal) = Please go ahead / Be my guest.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'الرَّاكِب',
        speakerNameEn: 'Passenger',
        arabic: 'إِلَى مُتْحَفِ الحَضَارَةِ لَوْ سَمَحْتَ. هَلْ يُمْكِنُكَ تَشْغِيلُ العَدَّادِ؟',
        transliteration: 'Ilā matḥafil-ḥaḍārati law samaḥt. Hal yumkinuka tashghīlul-‘addād?',
        english: 'To the Museum of Civilization please. Could you please turn on the meter?',
        grammarTip: '«العَدَّاد» (Al-‘addād) = The taxi meter.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'السَّائِق',
        speakerNameEn: 'Driver',
        arabic: 'بِالتَّأْكِيدِ يَا سَيِّدِي، تَوَكَّلْنَا عَلَى اللهِ. الطَّرِيقُ سَرِيعٌ اليَوْمَ.',
        transliteration: 'Bit-ta’kīdi yā sayyidī, tawakkalnā ‘alallāh. Aṭ-ṭarīqu sarī‘unil-yawm.',
        english: 'Certainly sir, we place our trust in God. The road is clear and fast today.',
        grammarTip: '«تَوَكَّلْنَا عَلَى اللهِ» is a culturally beloved phrase said before starting journeys.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'الرَّاكِب',
        speakerNameEn: 'Passenger',
        arabic: 'تَوَقَّفْ هُنَا عِنْدَ الإِشَارَةِ الضَّوْئِيَّةِ مِنْ فَضْلِكَ. كَمِ الحِسَابُ؟',
        transliteration: 'Tawaqqaf hunā ‘indal-ishāratid-ḍaw’iyyati min faḍlik. Kamil-ḥisāb?',
        english: 'Please stop here at the traffic light. How much is the fare?',
        grammarTip: '«مِنْ فَضْلِكَ» (Min fadlika) = If you please / Please.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'السَّائِق',
        speakerNameEn: 'Driver',
        arabic: 'خَمْسُونَ جُنَيْهًا فَقَطْ. حَمْدًا للهِ عَلَى سَلاَمَتِكَ!',
        transliteration: 'Khamsūna junayhan faqaṭ. Ḥamdan lillāhi ‘alā salāmatik!',
        english: '50 pounds only. Praise God for your safe arrival!',
        grammarTip: '«حَمْدًا للهِ عَلَى سَلاَمَتِكَ» = Standard greeting upon safe arrival.'
      }
    ]
  },
  {
    id: 'dialogue-5',
    titleEn: 'Bargaining & Shopping in the Souq',
    titleAr: 'التَّسَوُّقُ وَالشِّرَاءُ فِي السُّوقِ',
    category: 'Shopping & Commerce',
    scenario: 'Negotiating price and asking for traditional handmade souvenirs.',
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
        grammarTip: '«غَالٍ» (Ghālin) = Expensive, «أَفْضَل» (Afḍal) = Better (Comparative).'
      },
      {
        id: 4,
        speaker: 'A',
        speakerNameAr: 'البَائِع',
        speakerNameEn: 'Shopkeeper',
        arabic: 'لِأَنَّكِ ضَيْفَةٌ كَرِيمَةٌ، سَأَجْعَلُهُ بِثَمَانِينَ دِينَارًا لِعُيُونِكِ!',
        transliteration: 'Li’annaki ḍayfatun karīmah, sa’aj‘aluhu bithamānīna dīnārā li‘uyūnik!',
        english: 'Because you are an esteemed guest, I will make it 80 Dinars for your honor!',
        grammarTip: 'Bargaining is viewed as a friendly social rapport in Arab souqs.'
      },
      {
        id: 5,
        speaker: 'B',
        speakerNameAr: 'المُشْتَرِي',
        speakerNameEn: 'Shopper',
        arabic: 'اتَّفَقْنَا! سَآخُذُهُ، شُكْرًا لَكَ عَلَى كَرَمِكَ وَحُسْنِ مُعَامَلَتِكَ.',
        transliteration: 'Ittafaqnā! Sa’ākhudhuh, shukran laka ‘alā karamik wa ḥusni mu‘āmalatik.',
        english: 'Agreed! I will take it, thank you for your generosity and kind treatment.',
        grammarTip: '«اتَّفَقْنَا» (Ittafaqnā) = We have agreed / It is a deal!'
      }
    ]
  },
  {
    id: 'dialogue-6',
    titleEn: 'Dining at an Arabic Restaurant',
    titleAr: 'فِي المَطْعَمِ العَرَبِيِّ وَطَلَبُ الطَّعَامِ',
    category: 'Food & Dining',
    scenario: 'Ordering regional delicacies and asking for recommendations from the captain waiter.',
    level: 'intermediate',
    icon: 'Utensils',
    speakerA: { name: 'Waiter (النَّادِل)', avatar: '🤵', role: 'Head Waiter' },
    speakerB: { name: 'Diner (الزَّائِر)', avatar: '🧑‍💼', role: 'Customer' },
    roleplayPrompt: 'Practice ordering dishes, asking for menu recommendations, and requesting the bill.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'مَسَاءُ الخَيْرِ يَا سَيِّدِي، تَفَضَّلْ قَائِمَةَ الطَّعَامِ. مَا هُوَ طَلَبُكُمْ؟',
        transliteration: 'Masā’ul-khayri yā sayyidī, tafaḍḍal qā’imatat-ṭa‘ām. Mā huwa ṭalabukum?',
        english: 'Good evening sir, here is the menu. What is your order?',
        grammarTip: '«قَائِمَةُ الطَّعَامِ» (Qā’imatut-ta‘ām) = The menu.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'الزَّائِر',
        speakerNameEn: 'Diner',
        arabic: 'مَسَاءُ النُّورِ. بِمَاذَا تَنْصَحُنِي مِنْ أَطْبَاقِ اللَّحْمِ اليَوْمَ؟',
        transliteration: 'Masā’un-nūr. Bimādhā tanṣaḥunī min aṭbāqil-laḥmil-yawm?',
        english: 'Good evening. What meat dishes do you recommend today?',
        grammarTip: '«بِمَاذَا تَنْصَحُنِي؟» = What do you advise/recommend to me?'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'أَنْصَحُكَ بِطَبَقِ المَنْسَفِ الأُرْدُنِيِّ أَوْ مَشْوِيَّاتِ اللَّحْمِ المُشَكَّلَةِ.',
        transliteration: 'Anṣaḥuka biṭabaqil-mansafil-urduniyy aw mashwiyyātil-laḥmil-mushakkalah.',
        english: 'I recommend the Jordanian Mansaf dish or the mixed grilled meats.',
        grammarTip: '«طَبَق» (Tabaq) = Dish / Plate; «مَشْوِيَّات» = Grilled meats.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'الزَّائِر',
        speakerNameEn: 'Diner',
        arabic: 'سَآخُذُ المَنْسَفَ مَعَ سَلَطَةٍ خَضْرَاءَ وَمَشْرُوبِ لَيْمُونٍ بِالنَّعْنَاعِ.',
        transliteration: 'Sa’ākhudhul-mansafa ma‘a salaṭatin khaḍrā’a wa mashrūbi laymūnin bin-na‘nā‘.',
        english: 'I will take Mansaf with a green salad and a lemon-mint beverage.',
        grammarTip: '«خَضْرَاء» (Khadra’) is the feminine form of green (أَخْضَر).'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'النَّادِل',
        speakerNameEn: 'Waiter',
        arabic: 'اخْتِيَارٌ مُمْتَازٌ! صِحَّةٌ وَعَافِيَةٌ مُقَدَّمًا.',
        transliteration: 'Ikhtiyārun mumtāz! Siḥḥatun wa ‘āfiyatun muqaddaman.',
        english: 'An excellent choice! Bon appétit (health and wellness) in advance.',
        grammarTip: '«صِحَّةٌ وَعَافِيَةٌ» = Arabic equivalent of "Bon appétit".'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'الزَّائِر',
        speakerNameEn: 'Diner',
        arabic: 'اللهُ يُعَافِيكَ! الحِسَابُ لَوْ سَمَحْتَ بَعْدَ أَنْ أَنْتَهِيَ.',
        transliteration: 'Allāhu yu‘āfīk! Al-ḥisābu law samaḥta ba‘da an antahiya.',
        english: 'May God grant you health! The bill please after I finish.',
        grammarTip: '«الحِسَاب» (Al-hisāb) = The bill / check.'
      }
    ]
  },
  {
    id: 'dialogue-7',
    titleEn: 'Checking into a Hotel in Marrakech',
    titleAr: 'فِي فُنْدُقِ الإِقَامَةِ وَحَجْزُ الغُرْفَةِ',
    category: 'Travel & Navigation',
    scenario: 'Checking into a boutique hotel (Riad) with prior reservation.',
    level: 'intermediate',
    icon: 'Building2',
    speakerA: { name: 'Receptionist (مُوَظَّفُ الِاسْتِقْبَالِ)', avatar: '🏨', role: 'Staff' },
    speakerB: { name: 'Guest (النَّزِيل)', avatar: '🧳', role: 'Guest' },
    roleplayPrompt: 'Practice confirming a booking, asking about breakfast hours, and requesting WiFi credentials.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'مُوَظَّفُ الِاسْتِقْبَالِ',
        speakerNameEn: 'Receptionist',
        arabic: 'أَهْلاً وَسَهْلاً بِكُمْ فِي فُنْدُقِنَا! كَيْفَ أُسَاعِدُكَ يَا فَنْدِمْ؟',
        transliteration: 'Ahlan wa sahlan bikum fī funduqinā! Kayfa usā‘iduka yā fandim?',
        english: 'Welcome to our hotel! How may I assist you, sir?',
        grammarTip: '«كَيْفَ أُسَاعِدُكَ؟» = How can I help you?'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'النَّزِيل',
        speakerNameEn: 'Guest',
        arabic: 'لَدَيَّ حَجْزٌ مُسْبَقٌ بِاسْمِ يُوسُف كَمَال لِمُدَّةِ ثَلاَثِ لَيَالٍ.',
        transliteration: 'Ladayya ḥajzun musbaqun bismi Yūsuf Kamāl limuddati thalāthi layāl.',
        english: 'I have a prior reservation under the name Yusuf Kamal for three nights.',
        grammarTip: '«لَدَيَّ» (Ladayya) = I have (Possession particle).'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'مُوَظَّفُ الِاسْتِقْبَالِ',
        speakerNameEn: 'Receptionist',
        arabic: 'نَعَمْ يَا سَيِّدِي، الحَجْزُ مَوْجُودٌ. هَلْ يُمْكِنُنِي رُؤْيَةُ جَوَازِ السَّفَرِ؟',
        transliteration: 'Na‘am yā sayyidī, al-ḥajzu mawjūd. Hal yumkinunī ru’yatu jawāzis-safar?',
        english: 'Yes sir, the reservation is confirmed. May I see your passport?',
        grammarTip: '«جَوَازُ السَّفَرِ» (Jawāzus-safar) = Passport (Idafa construct).'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'النَّزِيل',
        speakerNameEn: 'Guest',
        arabic: 'تَفَضَّلْ. مَتَى يُقَدَّمُ الإِفْطَارُ الصَّبَاحِيُّ؟ وَمَا هِيَ كَلِمَةُ سِرِّ الإِنْتَرْنِت؟',
        transliteration: 'Tafaḍḍal. Matā yuqaddamul-ifṭāruṣ-ṣabāḥī? Wa mā hiya kalimatu sirril-intarnit?',
        english: 'Here you go. When is morning breakfast served? And what is the WiFi password?',
        grammarTip: '«كَلِمَةُ السِّرِّ» (Kalimatus-sirr) = Password / Secret word.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'مُوَظَّفُ الِاسْتِقْبَالِ',
        speakerNameEn: 'Receptionist',
        arabic: 'الإِفْطَارُ مِنَ السَّابِعَةِ إِلَى العَاشِرَةِ. هَذَا مِفْتَاحُ غُرْفَتِكَ رَقْمَ ۳۰۲.',
        transliteration: 'Al-ifṭāru minas-sābi‘ati ilal-‘āshirah. Hādhā miftāḥu ghurfatika raqma 302.',
        english: 'Breakfast is from 7 to 10. Here is your room key, number 302.',
        grammarTip: '«مِفْتَاح» (Miftāḥ) comes from root ف-ت-ح (to open).'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'النَّزِيل',
        speakerNameEn: 'Guest',
        arabic: 'شُكْرًا جَزِيلاً لَكَ، أَتَمَنَّى إِقَامَةً طَيِّبَةً.',
        transliteration: 'Shukran jazīlan lak, atamannā iqāmatan ṭayyibah.',
        english: 'Thank you very much, I look forward to a pleasant stay.',
        grammarTip: '«إِقَامَة طَيِّبَة» = A pleasant stay.'
      }
    ]
  },
  {
    id: 'dialogue-8',
    titleEn: 'Visiting the Clinic & Explaining Symptoms',
    titleAr: 'زِيَارَةُ الطَّبِيبِ وَالصَّيْدَلِيَّةِ',
    category: 'Health & Wellness',
    scenario: 'Consulting a doctor about seasonal flu symptoms and receiving a prescription.',
    level: 'intermediate',
    icon: 'Stethoscope',
    speakerA: { name: 'Doctor (الطَّبِيب)', avatar: '🩺', role: 'Physician' },
    speakerB: { name: 'Patient (المَرِيض)', avatar: '🤒', role: 'Patient' },
    roleplayPrompt: 'Practice expressing pain with «أَشْعُرُ بِـ» (I feel) and understanding medical instructions.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'الطَّبِيب',
        speakerNameEn: 'Doctor',
        arabic: 'أَهْلاً بِكَ. لاَ بَأْسَ عَلَيْكَ! مِمَّ تَشْكُو اليَوْمَ؟',
        transliteration: 'Ahlan bik. Lā ba’sa ‘alayk! Mimma tashkūl-yawm?',
        english: 'Welcome. No harm to you! What are you complaining of today?',
        grammarTip: '«لاَ بَأْسَ عَلَيْكَ» = Traditional Islamic wishing of quick recovery.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'المَرِيض',
        speakerNameEn: 'Patient',
        arabic: 'أَشْعُرُ بِصُدَاعٍ شَدِيدٍ وَأَلَمٍ فِي الحَلْقِ مُنْذُ يَوْمَيْنِ.',
        transliteration: 'Ash‘uru biṣudā‘in shadīdin wa alamin fīl-ḥalqi mundhu yawmayn.',
        english: 'I feel a severe headache and sore throat since two days ago.',
        grammarTip: '«أَشْعُرُ بِـ» (Ash‘uru bi-) = I feel / experience (a symptom).'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'الطَّبِيب',
        speakerNameEn: 'Doctor',
        arabic: 'هَلْ تُعَانِي مِنْ حَرَارَةٍ مُرْتَفِعَةٍ أَوْ سُعَالٍ؟',
        transliteration: 'Hal tu‘ānī min ḥarāratin murtafi‘atin aw su‘āl?',
        english: 'Are you suffering from a high fever or coughing?',
        grammarTip: '«تُعَانِي مِنْ» = You suffer from.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'المَرِيض',
        speakerNameEn: 'Patient',
        arabic: 'نَعَمْ، حَرَارَتِي مُرْتَفِعَةٌ قَلِيلاً خَاصَّةً فِي المَسَاءِ.',
        transliteration: 'Na‘am, ḥarāratī murtafi‘atun qalīlan khāṣṣatan fīl-masā’.',
        english: 'Yes, my temperature is slightly high, especially in the evening.',
        grammarTip: '«خَاصَّةً» (Khāṣṣatan) = Especially / Particularly.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'الطَّبِيب',
        speakerNameEn: 'Doctor',
        arabic: 'هَذِهِ إِنْفْلُوَنْزَا مَوْسِمِيَّةٌ. تَناوَلْ هَذَا الدَّوَاءَ بَعْدَ الطَّعَامِ وَالْزَمِ الرَّاحَةَ.',
        transliteration: 'Hādhihi influwanzā mawsimiyyah. Tanāwal hādhād-dawā’a ba‘daṭ-ṭa‘ām walzamir-rāḥah.',
        english: 'This is seasonal flu. Take this medicine after meals and get ample rest.',
        grammarTip: '«الْزَمِ الرَّاحَةَ» = Keep to rest / Stay in bed.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'المَرِيض',
        speakerNameEn: 'Patient',
        arabic: 'شُكْرًا جَزِيلاً يَا دُكْتُور، شَفَانَا اللهُ وَعَافَانَا.',
        transliteration: 'Shukran jazīlan yā duktūr, shafānallāhu wa ‘āfānā.',
        english: 'Thank you very much doctor, may God grant us healing and health.',
        grammarTip: '«شَفَانَا اللهُ» = May God cure us.'
      }
    ]
  },
  {
    id: 'dialogue-9',
    titleEn: 'At the Airport & Passport Control',
    titleAr: 'فِي المَطَارِ وَإِجْرَاءَاتُ السَّفَرِ',
    category: 'Travel & Navigation',
    scenario: 'Passing through border security and boarding gate at an international airport.',
    level: 'intermediate',
    icon: 'Plane',
    speakerA: { name: 'Immigration Officer (ضَابِطُ الجَوَازَاتِ)', avatar: '👮‍♂️', role: 'Officer' },
    speakerB: { name: 'Traveler (المُسَافِر)', avatar: '✈️', role: 'Passenger' },
    roleplayPrompt: 'Practice answering immigration questions about purpose and duration of visit.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'ضَابِطُ الجَوَازَاتِ',
        speakerNameEn: 'Officer',
        arabic: 'مَرْحَبًا. جَوَازَ السَّفَرِ وَبِطَاقَةَ الصُّعُودِ إِلَى الطَّائِرَةِ مِنْ فَضْلِكَ.',
        transliteration: 'Marḥaban. Jawāzas-safari wa biṭāqataṣ-ṣu‘ūdi ilaṭ-ṭā’irati min faḍlik.',
        english: 'Hello. Passport and boarding pass please.',
        grammarTip: '«بِطَاقَةُ الصُّعُودِ» (Biṭāqatuṣ-ṣu‘ūd) = Boarding pass.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'المُسَافِر',
        speakerNameEn: 'Traveler',
        arabic: 'تَفَضَّلْ يَا سَيِّدِي. هَذَا هُوَ الجَوَازُ وَالتَّذْكِرَةُ.',
        transliteration: 'Tafaḍḍal yā sayyidī. Hādhā huwal-jawāzu wat-tadhkirah.',
        english: 'Here you go sir. This is the passport and the ticket.',
        grammarTip: '«تَذْكِرَة» (Tadhkirah) = Ticket.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'ضَابِطُ الجَوَازَاتِ',
        speakerNameEn: 'Officer',
        arabic: 'مَا هُوَ الغَرَضُ مِنْ زِيَارَتِكَ؟ وَكَمْ يَوْمًا سَتَمْكُثُ؟',
        transliteration: 'Mā huwal-gharaḍu min ziyāratik? Wa kam yawman satamkuth?',
        english: 'What is the purpose of your visit? And how many days will you stay?',
        grammarTip: '«الغَرَض» (Al-gharaḍ) = Purpose / Reason.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'المُسَافِر',
        speakerNameEn: 'Traveler',
        arabic: 'الغَرَضُ هُوَ السِّيَاحَةُ وَدِرَاسَةُ اللُّغَةِ، وَسَأَبْقَى لِمُدَّةِ أُسْبُوعَيْنِ.',
        transliteration: 'Al-gharaḍu huwas-siyāḥatu wa dirāsatul-lughah, wa sa’abqā limuddati usbū‘ayn.',
        english: 'The purpose is tourism and language study, and I will stay for two weeks.',
        grammarTip: '«أُسْبُوعَيْنِ» (Usbū‘ayn) = Two weeks (Dual form / المُثَنَّى).'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'ضَابِطُ الجَوَازَاتِ',
        speakerNameEn: 'Officer',
        arabic: 'أَهْلاً بِكَ فِي بَلَدِنَا! خَتَمْتُ لَكَ الجَوَازَ، رِحْلَةً سَعِيدَةً!',
        transliteration: 'Ahlan bika fī baladinā! Khatamtu lakal-jawāz, riḥlatan sa‘īdah!',
        english: 'Welcome to our country! I stamped your passport, have a pleasant trip!',
        grammarTip: '«خَتَمْتُ» (Khatamtu) = I stamped.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'المُسَافِر',
        speakerNameEn: 'Traveler',
        arabic: 'بَارَكَ اللهُ فِيكَ، شُكْرًا جَزِيلاً عَلَى حُسْنِ التَّعَاوُنِ.',
        transliteration: 'Bārakallāhu fīk, shukran jazīlan ‘alā ḥusnit-ta‘āwun.',
        english: 'May God bless you, thank you very much for the kind cooperation.',
        grammarTip: '«بَارَكَ اللهُ فِيكَ» = Standard expression of gratitude and blessing.'
      }
    ]
  },
  {
    id: 'dialogue-10',
    titleEn: 'Arabic Hospitality & Visiting a Family Home',
    titleAr: 'كَرَمُ الضِّيَافَةِ وَزِيَارَةُ البَيْتِ',
    category: 'Culture & Social',
    scenario: 'Visiting an Arab friend’s family home for lunch and experiencing customary hospitality.',
    level: 'advanced',
    icon: 'HeartHandshake',
    speakerA: { name: 'Host (المُضِيف)', avatar: '🏠', role: 'Homeowner' },
    speakerB: { name: 'Guest (الضَّيْف)', avatar: '🎁', role: 'Visiting Friend' },
    roleplayPrompt: 'Practice authentic Arab hospitality formulas: «بَيْتٌ عَامِرٌ» (Prosperous home) and «أَكْرَمَكُمُ اللهُ» (May God honor you).',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'المُضِيف',
        speakerNameEn: 'Host',
        arabic: 'يَا مَرْحَبًا! نَوَّرْتَ بَيْتَنَا بِهَذِهِ الزِّيَارَةِ المُبَارَكَةِ!',
        transliteration: 'Yā marḥabā! Nawwarta baytanā bihādhihiz-ziyāratil-mubārakah!',
        english: 'Welcome! You illuminated our home with this blessed visit!',
        grammarTip: '«نَوَّرْتَ بَيْتَنَا» (Nawwarta baytanā) = You brought light to our house.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'الضَّيْف',
        speakerNameEn: 'Guest',
        arabic: 'البَيْتُ مُنَوَّرٌ بِأَهْلِهِ الكِرَامِ! بَيْتٌ عَامِرٌ بِالخَيْرِ وَالبَرَكَةِ دَائِمًا.',
        transliteration: 'Al-baytu munawwarun bi’ahlihil-kirām! Baytun ‘āmirun bil-khayri wal-barakati dā’iman.',
        english: 'The house is illuminated by its noble family! May it always be prosperous with goodness and blessings.',
        grammarTip: '«بَيْتٌ عَامِرٌ» is the traditional praise for a hospitable home.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'المُضِيف',
        speakerNameEn: 'Host',
        arabic: 'تَفَضَّلْ حَبَّةَ تَمْرٍ وَفِنْجَانَ قَهْوَةٍ، ثُمَّ نَجْلِسُ إِلَى مَائِدَةِ الغَدَاءِ.',
        transliteration: 'Tafaḍḍal ḥabbata tamrin wa finjāna qahwah, thumma najlisu ilā mā’idatil-ghadā’.',
        english: 'Please take a date and a cup of coffee, then we will sit at the lunch table.',
        grammarTip: 'Dates and coffee are the cornerstone of Arab reception customs.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'الضَّيْف',
        speakerNameEn: 'Guest',
        arabic: 'مَا شَاءَ اللهُ! هَذَا كَرَمٌ بَالِغٌ، سَلِمَتْ أَيْدِيكُمْ عَلَى هَذَا الطَّعَامِ الشَّهِيِّ.',
        transliteration: 'Mā shā’allāh! Hādhā karamun bāligh, salimat aydīkum ‘alā hādhāṭ-ṭa‘āmish-shahiyy.',
        english: 'God has willed it! This is immense generosity, blessed be your hands for this delicious food.',
        grammarTip: '«سَلِمَتْ أَيْدِيكُمْ» = "May your hands be safe/blessed" to the cook.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'المُضِيف',
        speakerNameEn: 'Host',
        arabic: 'هَنِيئًا مَرِيئًا لَكُمْ! أَنْتُمْ أَهْلُ الدَّارِ وَلَسْتُمْ ضُيُوفًا.',
        transliteration: 'Hanī’an marī’an lakum! Antum ahlud-dāri wa lastum ḍuyūfā.',
        english: 'May it bring health and delight! You are family of this home, not guests.',
        grammarTip: '«أَنْتُمْ أَهْلُ الدَّارِ» = You are family here (Utmost welcoming).'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'الضَّيْف',
        speakerNameEn: 'Guest',
        arabic: 'أَكْرَمَكُمُ اللهُ وَجَزَاكُمُ الفِرْدَوْسَ الأَعْلَى. شُكْرًا عَلَى حَفَاوَتِكُمْ.',
        transliteration: 'Akramakumullāhu wa jazākumul-firdawsal-a‘lā. Shukran ‘alā ḥafāwatikum.',
        english: 'May God honor you and grant you highest Paradise. Thank you for your warmth.',
        grammarTip: '«أَكْرَمَكُمُ اللهُ» = Traditional departure blessing to the host.'
      }
    ]
  },
  {
    id: 'dialogue-11',
    titleEn: 'Job Interview & Career Background',
    titleAr: 'مُقَابَلَةُ العَمَلِ وَالحَيَاةُ المِهْنِيَّةُ',
    category: 'Work & Professional',
    scenario: 'A job interview for a bilingual project coordinator position at a tech company.',
    level: 'advanced',
    icon: 'Briefcase',
    speakerA: { name: 'Interviewer (مُدِيرُ التَّوْظِيفِ)', avatar: '💼', role: 'HR Director' },
    speakerB: { name: 'Applicant (المُتَقَدِّمُ لِلْوَظِيفَةِ)', avatar: '👔', role: 'Candidate' },
    roleplayPrompt: 'Practice articulating your qualifications, professional skills, and teamwork abilities in formal Modern Standard Arabic.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'مُدِيرُ التَّوْظِيفِ',
        speakerNameEn: 'Interviewer',
        arabic: 'صَبَاحُ الخَيْرِ. هَلْ يُمْكِنُكَ أَنْ تُعْطِيَنَا نَبْذَةً مُوجَزَةً عَنْ خِبْرَتِكَ المِهْنِيَّةِ؟',
        transliteration: 'Ṣabāḥul-khayr. Hal yumkinuka an tu‘ṭiyanā nabdhatan mūjazatan ‘an khibratikal-mihniyyah?',
        english: 'Good morning. Could you give us a concise summary of your professional experience?',
        grammarTip: '«نَبْذَةٌ مُوجَزَةٌ» = A concise brief / summary.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'المُتَقَدِّمُ',
        speakerNameEn: 'Applicant',
        arabic: 'بِكُلِّ سُرُورٍ. عَمِلْتُ خَمْسَ سَنَوَاتٍ فِي إِدَارَةِ المَشَارِيعِ التِّقْنِيَّةِ وَتَطْوِيرِ البَرَامِجِ.',
        transliteration: 'Bikulli surūr. ‘Amiltu khamsa sanawātin fī idāratil-mashārī‘it-tiqniyyati wa taṭwīril-barāmij.',
        english: 'With pleasure. I worked for 5 years in managing tech projects and software development.',
        grammarTip: '«بِكُلِّ سُرُورٍ» = With all pleasure.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'مُدِيرُ التَّوْظِيفِ',
        speakerNameEn: 'Interviewer',
        arabic: 'مَا هِيَ أَبْرَزُ نِقَاطِ قُوَّتِكَ فِي بِيئَةِ العَمَلِ الجَمَاعِيِّ؟',
        transliteration: 'Mā hiya abrazu niqāṭi quwwatika fī bī’atil-‘amalil-jamā‘ī?',
        english: 'What are your prominent strengths in a team collaborative environment?',
        grammarTip: '«نِقَاطُ القُوَّةِ» = Points of strength / Strengths.'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'المُتَقَدِّمُ',
        speakerNameEn: 'Applicant',
        arabic: 'أَمْتَلِكُ مَهَارَاتِ تَوَاصُلٍ فَعَّالَةٍ، وَالقُدْرَةَ عَلَى حَلِّ المُشْكِلاَتِ تَحْتَ الضَّغْطِ.',
        transliteration: 'Amtaliku mahārāti tawāṣulin fa‘‘ālah, wal-qudrata ‘alā ḥallil-mushkilāti taḥtaḍ-ḍaghṭ.',
        english: 'I possess effective communication skills, and the capacity to solve problems under pressure.',
        grammarTip: '«تَحْتَ الضَّغْطِ» = Under pressure.'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'مُدِيرُ التَّوْظِيفِ',
        speakerNameEn: 'Interviewer',
        arabic: 'رَائِعٌ جِدًّا! سَنَقُومُ بِالتَّوَاصُلِ مَعَكَ خِلاَلَ الأُسْبُوعِ القَادِمِ لإِبْلاَغِكَ بِالنَّتِيجَةِ.',
        transliteration: 'Rā’i‘un jiddan! Sanaqūmu bit-tawāṣuli ma‘aka khilālal-usbū‘il-qādimi li’iblāghika bin-natījah.',
        english: 'Very wonderful! We will get in touch with you during next week to inform you of the outcome.',
        grammarTip: '«خِلاَلَ الأُسْبُوعِ القَادِمِ» = During next week.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'المُتَقَدِّمُ',
        speakerNameEn: 'Applicant',
        arabic: 'أَشْكُرُكُمْ جَزِيلَ الشُّكْرِ عَلَى هَذِهِ الفُرْصَةِ الثَّمِينَةِ، وَفِي أَمَانِ اللهِ.',
        transliteration: 'Ashkurukum jazīlash-shukri ‘alā hādhihil-furṣatith-thamīnah, wa fī amānillāh.',
        english: 'I thank you immensely for this valuable opportunity, and peace be with you.',
        grammarTip: '«فُرْصَةٌ ثَمِينَةٌ» = A valuable opportunity.'
      }
    ]
  },
  {
    id: 'dialogue-12',
    titleEn: 'Discussing Weather & Weekend Outing',
    titleAr: 'حَالَةُ الطَّقْسِ وَخُطَطُ عُطْلَةِ نِهَايَةِ الأُسْبُوعِ',
    category: 'Daily Life',
    scenario: 'Two friends talking about changing seasons and organizing a weekend picnic in the park.',
    level: 'beginner',
    icon: 'Sun',
    speakerA: { name: 'Zaid (زَيْد)', avatar: '🌤️', role: 'Friend A' },
    speakerB: { name: 'Mona (مُنَى)', avatar: '🌸', role: 'Friend B' },
    roleplayPrompt: 'Practice talking about weather conditions (sunny, rainy, pleasant) and making weekend plans.',
    dialogue: [
      {
        id: 1,
        speaker: 'A',
        speakerNameAr: 'زَيْد',
        speakerNameEn: 'Zaid',
        arabic: 'كَيْفَ الجَوُّ عِنْدَكُمْ اليَوْمَ يَا مُنَى؟',
        transliteration: 'Kayfal-jawwu ‘indakumul-yawma yā Munā?',
        english: 'How is the weather by you today, Mona?',
        grammarTip: '«الجَوّ» (Al-jaww) or «الطَّقْس» (Aṭ-ṭaqs) = The weather.'
      },
      {
        id: 2,
        speaker: 'B',
        speakerNameAr: 'مُنَى',
        speakerNameEn: 'Mona',
        arabic: 'الطَّقْسُ مُعْتَدِلٌ وَمُشْمِسٌ، وَنَسِيمُ الصَّبَاحِ عَلِيلٌ جِدًّا.',
        transliteration: 'Aṭ-ṭaqsu mu‘tadilun wa mushmis, wa nasīmuṣ-ṣabāḥi ‘alīlun jiddan.',
        english: 'The weather is mild and sunny, and the morning breeze is very refreshing.',
        grammarTip: '«مُعْتَدِل» = Mild / Moderate; «مُشْمِس» = Sunny.'
      },
      {
        id: 3,
        speaker: 'A',
        speakerNameAr: 'زَيْد',
        speakerNameEn: 'Zaid',
        arabic: 'مَا رَأْيُكِ أَنْ نَذْهَبَ فِي رِحْلَةٍ إِلَى الحَدِيقَةِ فِي عُطْلَةِ نِهَايَةِ الأُسْبُوعِ؟',
        transliteration: 'Mā ra’yuki an nadhhaba fī riḥlatin ilal-ḥadīqati fī ‘uṭlati nihāyatil-usbū‘?',
        english: 'What do you think about going on an outing to the park over the weekend?',
        grammarTip: '«مَا رَأْيُكِ أَنْ...» = What is your opinion on / How about...?'
      },
      {
        id: 4,
        speaker: 'B',
        speakerNameAr: 'مُنَى',
        speakerNameEn: 'Mona',
        arabic: 'فِكْرَةٌ رَائِعَةٌ! سَأُحَضِّرُ بَعْضَ الفَطَائِرِ وَالشَّايَ بِالنَّعْنَاعِ.',
        transliteration: 'Fikratun rā’i‘ah! Sa’uḥaḍḍiru ba‘ḍal-faṭā’iri wash-shāya bin-na‘nā‘.',
        english: 'A wonderful idea! I will prepare some pastries and mint tea.',
        grammarTip: '«فِكْرَةٌ رَائِعَةٌ» = A wonderful / great idea!'
      },
      {
        id: 5,
        speaker: 'A',
        speakerNameAr: 'زَيْد',
        speakerNameEn: 'Zaid',
        arabic: 'مُمْتَازٌ! سَأَمُرُّ عَلَيْكِ يَوْمَ السَّبْتِ فِي السَّاعَةِ العَاشِرَةِ صَبَاحًا.',
        transliteration: 'Mumtāz! Sa’amurru ‘alayki yawmas-sabti fīs-sā‘atil-‘āshirati ṣabāḥā.',
        english: 'Excellent! I will pass by you on Saturday at ten o’clock in the morning.',
        grammarTip: '«يَوْمَ السَّبْتِ» = Saturday.'
      },
      {
        id: 6,
        speaker: 'B',
        speakerNameAr: 'مُنَى',
        speakerNameEn: 'Mona',
        arabic: 'إِنْ شَاءَ اللهُ! نَلْتَقِي عَلَى خَيْرٍ.',
        transliteration: 'In shā’allāh! Naltaqī ‘alā khayr.',
        english: 'God willing! May we meet in good health and joy.',
        grammarTip: '«نَلْتَقِي عَلَى خَيْرٍ» = Traditional closing for scheduled meetups.'
      }
    ]
  }
];
