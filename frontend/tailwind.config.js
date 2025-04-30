module.exports = {
  content: ['./pages/**/*.{js,jsx}','./components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#046C49',       // emerald green
        accent: '#D4AF37',        // gold
        secondary: '#0F766E',     // teal
        gradientStart: '#0F766E', // teal
        gradientEnd: '#046C49',   // emerald
        bgLight: '#F3F4F6'
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    }
  },
  plugins: [],
};