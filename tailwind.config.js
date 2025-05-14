import scrollbarHide from 'tailwind-scrollbar-hide';
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // Add any additional folders if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarHide
  ],
};
