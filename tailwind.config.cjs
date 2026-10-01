/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1E5BB8',
          dark: '#0C2340',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#D92228',
          hover: '#B91C1C',
        },
        slate: {
          850: '#151E2E',
          925: '#0B111D',
          950: '#070B12',
        },
      },
    },
  },
  plugins: [],
};
