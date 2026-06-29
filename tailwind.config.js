/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#2db84b',
          dark: '#1e9e3a',
          footer: '#1db954',
        },
        bg: {
          main: '#f5f5f3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.2rem, 4.5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'ada': ['clamp(5rem, 14vw, 14rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}
