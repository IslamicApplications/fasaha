/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Amiri"', '"Scheherazade New"', '"Noto Naskh Arabic"', 'serif'],
        arabicSans: ['"Cairo"', '"Noto Sans Arabic"', 'sans-serif'],
        quran: ['"Amiri Quran"', '"Scheherazade New"', 'serif'],
        ruqaa: ['"Aref Ruqaa"', 'serif'],
      },
      colors: {
        emerald: {
          850: '#064e3b',
          950: '#022c22',
        },
        parchment: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5ebd3',
          300: '#ebd8b0',
          400: '#dec085',
          800: '#45351a',
          900: '#2b210f',
        }
      }
    },
  },
  plugins: [],
}
