import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: { 900: '#0a0a0f', 800: '#111118', 700: '#1a1a24', 600: '#242430' },
        emerald: { 400: '#34d399', 500: '#10b981', 600: '#059669' },
      }
    }
  },
  plugins: []
} satisfies Config;
