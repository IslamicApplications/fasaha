# Fasaha (فَصَاحَة) • Arabic Mastery & Literacy Web Application

**Fasaha** is an interactive, modern, full-featured web application designed to teach Arabic reading, writing, grammar, and conversation. It is architected specifically around the 6 core pedagogical steps of Arabic language acquisition.

---

## Today’s Lesson

The home screen offers a guided daily session: up to three overdue or new vocabulary words, a listening dictation, a grammar question, and a conversation phrase. Grammar practice prioritizes questions missed in previous quizzes. Vocabulary answers update the existing spaced repetition schedule.

Progress is saved locally so a lesson can be resumed after navigation or refresh. A completed lesson shows accuracy by exercise and a goal for tomorrow. Completion XP is awarded once per lesson date. Conversation supports microphone recognition with a typing alternative; browser audio and microphone support vary.

## 🌟 6-Step Pedagogical Architecture

### 1. 📖 Understand Basic Elements (الأبجدية والأصوات)
- **Complete 28 Arabic Letters + Hamza + Tā' Marbūṭah**: Filter by Sun/Moon letters, Emphatic sounds, and Non-connectors.
- **4 Positional Forms Breakdown**: Isolated (منفصل), Initial (بداية), Medial (وسط), and Final (نهاية).
- **Phonetics & Makhraj (Points of Articulation)**: Detailed anatomical guide for guttural and emphatic Arabic sounds.
- **Harakat & Diacritics Guide**: Fatḥah (َ), Ḍammah (ُ), Kasrah (ِ), Sukūn (ْ), Shaddah (ّ), and Tanwīn (ً ٌ ٍ).
- **Interactive Calligraphy & Tracing Canvas**: Smooth ruled notebook canvas with baseline guides, ghost templates, and angled **Qalam (قلم)** reed pen nib simulation!
- **Phonetics & Listening Master Quiz**: Interactive audio-driven letter recognition challenges.

### 2. 📚 Build Vocabulary (المفردات والقواميس)
- **8 Thematic Decks (150+ Words)**: Greetings & Courtesies, Family & People, Food & Dining, Numbers & Time, Places & Travel, Essential Verbs, Adjectives & Colors, and Islamic/Cultural terms.
- **3D Spaced-Repetition Flashcards**: Interactive 3D flip card with Arabic text, transliteration toggle, English translations, and sample sentences with audio.
- **Interactive Word Match Game**: Dynamic pairing game between Arabic vocabulary and English meanings.
- **Catalog & Bookmarking**: Searchable vocabulary bank with instant audio playback and mastery markers.

### 3. ✍️ Practice Reading & Writing (القراءة والكتابة)
- **Graded Interactive Reading Room**: Graded stories with beginner, intermediate, and advanced levels.
  - **Tashkeel (Vowel Diacritics) Toggle**: Switch between full voweling and unvoweled script.
  - **Click-to-Translate Words**: Click any word in a story for popup definitions, grammar notes, and audio.
  - **Read-Aloud Sentence Player**: Highlighted audio playback.
  - **Reading Comprehension Quizzes**: Instant answer checks and explanations.
- **Interactive Script Connector Lab**: Real-time cursive letter combiner highlighting how letters join and explaining the 6 non-connecting letters (د، ذ، ر، ز، و، ا).
- **Writing & Typing Studio**:
  - Full **Virtual Arabic Keyboard** with diacritical mark row (تَشْكِيل).
  - Sentence copybook and live accuracy evaluator.

### 4. 🏛️ Learn Grammar Rules (قواعد اللغة)
- **8 Structured Lessons**:
  1. Noun Gender & Tā' Marbūṭah (المذكر والمؤنث)
  2. Definite Article & Sun/Moon Letters (الـ الشمسية والـ القمرية)
  3. Subject & Attached Pronouns (الضمائر المنفصلة والمتصلة)
  4. Demonstrative Pronouns (أسماء الإشارة)
  5. Idāfah Possessive Construct (الإضافة)
  6. Past Tense Verb Conjugation (الفعل الماضي)
  7. Present Tense Verb Conjugation (الفعل المضارع)
  8. Noun-Adjective Agreement (الموصوف والصفة)
- **Live Verb Conjugation Simulator**: Choose any 3-letter root verb (كتب، قرأ، شرب، ذهب) and toggle between Past, Present, and Imperative tenses to see the pronoun matrix with audio.
- **Grammar Knowledge Quizzes**: Validated quizzes with immediate explanations and XP rewards.

### 5. 💬 Conversational Practice (المحادثة والنطق)
- **Real-Life Branching Dialogues**: Meeting for the first time, ordering at a café, bargaining at the Souq.
- **Native Audio Player**: Hear entire conversations or line-by-line speaker audio.
- **Microphone Speech Recognition Studio**: Speak Arabic into your microphone (`webkitSpeechRecognition`) to receive real-time speech-to-text accuracy scoring!
- **Interactive Roleplay Mode**: Take on character roles (Speaker A or B) and practice speaking responses.

### 6. 🕌 Cultural Immersion (الثقافة والحكمة)
- **Arabic Proverbs & Wisdom (الأمثال والحكم)**: Literal vs figurative meanings, audio pronunciation, and cultural backgrounds.
- **Calligraphy Styles Explorer**: Showcase of 5 historical scripts (Naskh, Thuluth, Diwani, Ruq'ah, Kufic) with live font rendering.
- **Dialect Compass (بوصلة اللهجات)**: Compare Modern Standard Arabic (Fusha) phrases side-by-side with Egyptian, Levantine, Gulf, and Moroccan Darija equivalents.

### 🎯 Practice Hub & Gamification
- **Daily 5-Question Master Challenge**
- **Letter Scramble Word Builder**
- **XP, Daily Streaks, and 8 Unlockable Badges**
- **Themes**: Light Mode, Dark Mode, and **Warm Parchment (ورق قديم)** Calligraphy mode.

---

## 🚀 Running the Web App

In your terminal, run:

```bash
# Start the local development server
npm run dev
```

Then open the local URL (e.g. `http://localhost:5173`) in your browser.

To build for production:

```bash
npm run build
npm run preview
```


## Natural Arabic lesson audio

Lesson playback first looks for a local MP3 in `src/data/audioManifest.ts`. Missing clips and custom text fall back to the browser voice. Playback speed controls work for either source. The app makes no Google API requests and contains no Google credentials.

Generate audio with Google Cloud Text-to-Speech using the Modern Standard Arabic `ar-XA-Chirp3-HD-Charon` voice. See [Google's Chirp 3 documentation](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) and [authentication guide](https://docs.cloud.google.com/text-to-speech/docs/authentication).

1. Create a Google Cloud project, enable billing and the Cloud Text-to-Speech API.
2. Install the Google Cloud CLI and sign in with `gcloud auth login`.
3. Set `GOOGLE_CLOUD_PROJECT` to your project ID in your local terminal. Alternatively, set both `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_ACCESS_TOKEN` locally with a valid OAuth access token. Do not add credentials to source files or `VITE_` variables.
4. Preview the six sample phrases without API requests:

   ```bash
   npm run audio:preview
   ```

5. Generate the sample batch, listen to the files in `public/audio`, and check their pronunciation:

   ```bash
   npm run audio:generate
   ```

6. Once satisfied with the samples, generate the remaining lesson clips:

   ```bash
   npm run audio:generate -- --all
   npm run build
   ```

The generator saves its progress after every successful clip and reuses matching recordings on later runs. Both `public/audio/*.mp3` and `src/data/audioManifest.ts` must be included in deployment. A new voice generates new files rather than reusing the previous voice's clips. API generation uses your Google Cloud billing account; the preview is free of API calls.

Options: `--limit 12`, `--voice ar-XA-Chirp3-HD-Kore`, `--all`, and `--include-phonetics`. Isolated letters and vowel samples are excluded by default; generate these only with `--include-phonetics` and review them with an Arabic speaker before publishing. Qur’anic recitation keeps its existing recorded audio; this generator does not synthesize Qur’anic verses. Grammar examples containing Latin annotations are skipped and keep browser playback.
