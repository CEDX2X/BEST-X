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
        display: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "Noto Sans", "Liberation Sans", "sans-serif"],
      },
      colors: {
        primary: '#2F73D2',
        'primary-dark': '#153A6A',
        accent: "#ec1313",
      },
    },
  },
  plugins: [],
};
