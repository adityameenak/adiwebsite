/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Typography
      fontFamily: {
        display: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"DM Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.15em',
        ultra: '0.25em',
      },

      // Colors
      colors: {
        // Accent — muted steel blue (replaces purple)
        // Inspired by the blue light of cleanroom displays, silicon wafer
        // inspection tools, and semiconductor process monitors.
        accent: {
          DEFAULT: '#5B9BD5',   // muted steel blue
          light:   '#89BCE0',   // lighter blue-gray
          dark:    '#3A7AB5',   // deeper steel blue
          muted:   '#C0D9F0',   // very light blue (badge backgrounds)
          subtle:  '#EAF3FB',   // near-white blue tint
        },

        // Neutral — slightly blue-shifted at the dark end to match the slate
        // background, giving a cohesive dark palette vs. pure cold black.
        neutral: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0D1B2A',   // deep slate blue (was pure black #0A0A0A)
        },
      },

      // Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // Container
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Shadows — steel blue tint instead of purple
      boxShadow: {
        'glow':    '0 0 40px -10px rgb(91 155 213 / 0.25)',
        'glow-lg': '0 0 60px -15px rgb(91 155 213 / 0.32)',
        'soft':    '0 4px 30px -5px rgb(0 0 0 / 0.18)',
        'soft-lg': '0 8px 40px -10px rgb(0 0 0 / 0.24)',
      },

      // Animations
      animation: {
        'fade-in':      'fadeIn 0.5s ease-out',
        'fade-up':      'fadeUp 0.6s ease-out',
        'slide-in-left':'slideInLeft 0.5s ease-out',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },

      // Transitions
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'snappy': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
      },

      // Z-index
      zIndex: {
        'wordmark': '1000',
        'progress': '999',
        'nav':      '900',
      },

      // Background
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },

      // Aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}
