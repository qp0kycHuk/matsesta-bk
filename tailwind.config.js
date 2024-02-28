const elementsSizes = {
  xs: '28px',
  sm: '44px',
  base: '52px',
  lg: '64px',
  xl: '76px',
}

const headingStyles = {
  fontWeight: '500',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  darkMode: ['class', '[data-theme="dark"]'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      xs: 420 + 29.98 + 'px',
      sm: 580 + 29.98 + 'px',
      md: 720 + 29.98 + 'px',
      lg: 992 + 29.98 + 'px',
      xl: 1366 + 'px',
    },
    container: {
      xs: 420 + 'px',
      sm: 580 + 'px',
      md: 720 + 'px',
      lg: 992 + 'px',
      xl: 1230 + 'px',
    },
    colors: {
      primary: '#658A88',
      sec: '#003D32',
      blue: '#2980b9',
      red: '#D63615',
      green: '#27ae60',
      yellow: '#f39c12',
      gray: '#333',
      white: '#fff',
      black: '#1c1c1c',
      default: 'var(--text)',
      l1: 'var(--bg1)',
      l2: 'var(--bg2)',
      l3: 'var(--bg3)',
    },
    fontFamily: {
      base: 'var(--font-base)',
      alt: 'var(--font-alt)',
    },
    zIndex: [0, 321, 322, 323, 324, 325, 326, 327, 328, 329, 'auto'],
    extend: {
      spacing: {
        [15]: (15 / 4) + 'rem',
        [25]: (25 / 4) + 'rem',
      },
      inputSize: elementsSizes,
      btnSize: elementsSizes,
      borderRadius: {
        base: '32px'
      },
      boxShadow: {
        2: '0px 8px 20px 0px #20294C0F, 0px 1px 3px 0px #20294C1A'
      },
      fontSize: {
        '1.5xl': ['1.375rem', '1.35'],
        '2.1xl': ['1.5625rem', '1.35'],
        '2.5xl': ['1.75rem', '1.35'],
        '3.5xl': ['2rem', '1.35'],
        '4.5xl': ['2.5rem', '1.35'],
        '5.5xl': ['3.5rem', '1.35'],
      },
    },
  },
  plugins: [
    require('@qpokychuk/tailwind-button-plugin'),
    require('@qpokychuk/tailwind-ratio-plugin'),
    require('./tailwind.input.js')({}),
    require('./tailwind.checkbox.js')({}),
  ],
}
