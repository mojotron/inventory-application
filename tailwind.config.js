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
        900: '#18181b',
      },

      gold: {
        500: '#f59e0b',
      },
    },
    extend: {},
  },
  plugins: [],
  separator: '_',
};
