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
        'sid': '1fr 4fr' ,
      },
      boxShadow: {
        'sh': '0 0 6px -1px #aaa',
        'card': '0 0 6px #aaa',
      }
    },
  },
  plugins: [],
}
