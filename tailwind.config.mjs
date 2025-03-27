/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Text', 'sans-serif'], // Основной шрифт
        display: ['SF Pro Display', 'sans-serif'], // Для заголовков
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
