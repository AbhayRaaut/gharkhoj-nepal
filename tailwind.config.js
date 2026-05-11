export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top left, rgba(249, 115, 22, 0.2), transparent 35%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.16), transparent 30%)',
      },
    },
  },
  plugins: [],
}
