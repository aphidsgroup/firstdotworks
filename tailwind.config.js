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
          charcoal: '#2C2C2C',
          'charcoal-light': '#3D3D3D',
          cyan: '#29ABE2',
          'cyan-dark': '#1A8FBF',
          'cyan-light': '#E8F7FD',
          orange: '#F7941D',
          'orange-dark': '#D97B0F',
          'orange-light': '#FEF3E2',
        },
        surface: {
          DEFAULT: '#F5F6FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#8A8FA8',
        },
        dark: {
          bg: '#111827',
          surface: '#1F2937',
          card: '#1F2937',
          border: '#374151',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'card-md': '0 4px 16px 0 rgba(0,0,0,0.08)',
        'card-lg': '0 8px 32px 0 rgba(0,0,0,0.10)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
