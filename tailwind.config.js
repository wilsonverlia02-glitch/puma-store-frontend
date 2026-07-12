/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff5a5a',
          500: '#f02d2d',
          600: '#dc1818',
          700: '#b71212',
          800: '#971515',
          900: '#7c1717',
          950: '#430808',
        },
        gold: {
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#fce588',
          300: '#fadb5f',
          400: '#f7c948',
          500: '#f0b429',
          600: '#de911d',
          700: '#cb6e17',
          800: '#b44d12',
          900: '#8d3b12',
        },
        ink: {
          50: '#f6f6f7',
          100: '#e2e2e6',
          200: '#c6c6ce',
          300: '#9e9eab',
          400: '#717180',
          500: '#52525f',
          600: '#3f3f4a',
          700: '#33333c',
          800: '#1d1d24',
          900: '#111116',
          950: '#08080b',
        },
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(0,0,0,0.08), 0 6px 24px -4px rgba(0,0,0,0.10)',
        cardHover: '0 8px 24px -6px rgba(0,0,0,0.18), 0 20px 48px -12px rgba(0,0,0,0.20)',
        glow: '0 0 0 4px rgba(240,45,45,0.18)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        flyToCart: {
          '0%': { transform: 'scale(1) translate(0,0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'scale(0.2) translate(var(--tx), var(--ty))', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
