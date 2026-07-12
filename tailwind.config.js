/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ensi: {
          navy: '#1B2A4A',
          blue: '#4DB8E8',
          lightblue: '#A8D8F0',
          accent: '#2563EB',
          red: '#E63946',
          gray: '#F5F7FA',
          cardgray: '#E8EDF4',
        },
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease forwards',
      },
    },
  },
  plugins: [],
}
