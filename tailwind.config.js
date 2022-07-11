/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary': '#1D36D3',
      'secondary': '#ACB3DF',
      'third': '#D3E5EC',
      'white': '#FFFFFF',
      'black': '#000000',
      'error': '#C90E0E',
    },
  },
  plugins: [],
}
