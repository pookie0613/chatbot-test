/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        TK: {
          background: '#131921',
          default: '#131921',
        },
        'red-primary': '#e74b3c',
        'gray-primary': '#f8f9fa',
        'gray-secondary': '#e8e8e8',
        'gray-send': '#bdc3c7',
        'green-primary': '#2fcc71',
        'dark-red': '#c1483b',
        'main-text': '#2c3d50',
        'secondary-text': '#333333',
      },
      boxShadow: {
        'bot-message': '0px 1px 4px 2px #d3d3d36e',
      },
    },
  },
  plugins: [],
};
