/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{pug, html}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Six Caps', 'serif'],
    },
    colors: {
      gray: {
        200: '#e4e4e7',
        800: '#27272a',
        900: '#18181b',
      },
      gold: {
        500: '#f59e0b',
      },
      poor: '#71717a',
      common: '#f5f5f5',
      uncommon: '#22c55e',
      rare: '#0284c7',
      epic: '#7e22ce',
      legendary: '#c2410c',
      error: '#f43f5e',
    },
    extend: {},
  },
  plugins: [],
  separator: '_',
};
