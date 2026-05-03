/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#111827',
          'charcoal-light': '#1F2937',
          cyan: '#00AEEF',
          'cyan-dark': '#008CBE',
          'cyan-light': '#E0F7FF',
          orange: '#F7941D',
          'orange-dark': '#C97715',
          'orange-light': '#FEF3E2',
        },
        surface: {
          DEFAULT: '#F8F9FA',
          card: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#9CA3AF',
        },
        dark: {
          bg: '#0B0F19',
          surface: '#131B2B',
          card: '#131B2B',
          border: '#1F2937',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(0,0,0,0.03)',
        'card-md': '0 8px 32px -4px rgba(0,0,0,0.06)',
        'card-lg': '0 16px 48px -8px rgba(0,0,0,0.10)',
        'glow-cyan': '0 0 20px rgba(0, 174, 239, 0.15)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
