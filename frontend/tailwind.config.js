/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        'pr': 'repeat(auto-fit, minmax(200px, 1fr))' ,
        'cart': '4fr 1fr 1fr' ,
        'sid': '1fr 5fr' ,
      },
      boxShadow: {
        'sh': '0 0 6px -1px #aaa',
        'card': '0 0 6px #aaa',
      },
      colors: {
        'mainDarkColor': '#088f7e',
        'mainColor': '#89dad0',
        'textColor': '#ccc7c5',
        'blue': 'blue',
      },
      fontFamily: {
        'tajawal' : ['"Tajawal"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
