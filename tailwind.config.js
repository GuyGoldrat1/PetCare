/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'bg-black-t-50': 'rgba(0,0,0,0,5)',
      }
    },
  },
  plugins: [],
}
