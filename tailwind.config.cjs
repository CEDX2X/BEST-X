/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: "#0b2e4f",
        accent: "#ec1313",
      },
    },
  },
  plugins: [],
};
