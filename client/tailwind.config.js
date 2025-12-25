/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C3A', // Deep Islamic Green
        secondary: '#D4AF37', // Gold
        accent: '#C0392B', // Terracotta for highlights
        neutral: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          800: '#2C3E50',
          900: '#1A252F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
