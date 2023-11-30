/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        'custom1': {
          100: '#e8f0db',
          200: '#cce1b2',
          300: '#A4BE7B',
          400: '#87a36a',
          500: '#5F8D4E',
          600: '#507145',
          700: '#285430',
          800: '#213721',
        },
      }
    },
  },
  plugins: [],
};

