/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF9EF',
          100: '#FAF1D7',
          200: '#F5E1AA',
          300: '#ECCB76',
          400: '#F2C14E',
          500: '#D4A017',
          600: '#B8860B',
          700: '#916706',
          800: '#75520A',
          900: '#463004',
        },
        dark: {
          950: '#050505',
          900: '#0D0D0D',
          850: '#141414',
          800: '#1A1A1A',
          700: '#2A2A2A',
        }
      },
      fontFamily: {
        serif: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 160, 23, 0.25)',
        'gold-lg': '0 10px 30px -4px rgba(212, 160, 23, 0.35)',
        'luxury': '0 15px 35px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -3px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
