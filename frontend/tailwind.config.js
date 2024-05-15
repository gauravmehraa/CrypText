/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'cryptext-black': '#171717',
      'cryptext-gray': '#444444',
      'cryptext-red': '#950101', //DA0037
      'cryptext-white': '#EDEDED',
      'cryptext-green': '#008170', //005B41
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

