/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
