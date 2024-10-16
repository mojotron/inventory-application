/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,js,ejs}'],
  theme: {
    // fonts
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      sans: ['Hind', 'sans-serif'],
    },
    fontWeight: {
      thin: '300',
      normal: '500',
      bold: '700',
    },
    fontSize: {
      xs: '0.64rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      '2xl': '1.953rem',
      '3xl': '2.441rem',
      '4xl': '3.052rem',
      '5xl': '3.815rem',
    },
    // colors
    colors: {
      black: '#65635f',
      white: '#eae8dc',
      gray: {
        200: '#a4a19c',
        500: '#8e8d89',
        800: '#62635e',
      },
      red: {
        200: '#e88073',
        500: '#e85a50',
        800: '#bf2420',
      },
    },
    // spacing
    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      0.5: '4px',
      1: '8px',
      2: '12px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '56px',
    },
    extend: {},
  },
  plugins: [],
  safelist: [],
};
