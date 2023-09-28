/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './stories/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff2400',
        secondary: '#50ebd9',
        terciary: '#303536',
        info: '#008dd5',
        warning: '#FBAF00',
        error: '#ff2400',
        success: '#50ebd9',
        // onyx: '#303536',
        // ebony: '#615d49',
        // 'russian-violet': '#1a024a',
        // 'french-violet': '#7400b8',
        // grape: '#6930c3',
        // magenta: '#ff0090',
        // scarlet: '#ff2400',
        // 'vivid-sky-blue': '#0ecdeb',
        // 'celestial-blue': '#008dd5',
        // turquoise: '#50ebd9',
        gray: {
          2: '#D0D0CE',
          4: '#BBBCBC',
          6: '#A7A8AA',
          7: '#97999B',
          9: '#76787B',
          10: '#63666A',
          11: '#53565A',
        },
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tailwindcss-neumorphism'),
  ],
};
