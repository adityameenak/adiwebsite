/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter is the sole display and body font (Plain Black substitute per DESIGN.md)
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        // Clay display scale
        'display-xl': ['72px',  { lineHeight: '1.0',  letterSpacing: '-2.5px' }],
        'display-lg': ['56px',  { lineHeight: '1.05', letterSpacing: '-2px'   }],
        'display-md': ['40px',  { lineHeight: '1.1',  letterSpacing: '-1px'   }],
        'display-sm': ['32px',  { lineHeight: '1.15', letterSpacing: '-0.5px' }],
        // Legacy large sizes kept for compatibility
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem',   { lineHeight: '1'   }],
        '9xl': ['8rem',   { lineHeight: '1'   }],
      },

      letterSpacing: {
        tighter: '-0.05em',
        tight:   '-0.025em',
        normal:  '0',
        wide:    '0.025em',
        wider:   '0.05em',
        widest:  '0.15em',
        ultra:   '0.25em',
      },

      colors: {
        // ── Clay primary text tokens ──────────────────────────────────────────
        ink:          '#0a0a0a',
        body:         '#3a3a3a',
        muted:        '#6a6a6a',
        'muted-soft': '#9a9a9a',
        hairline:     '#e5e5e5',
        'hairline-soft': '#f0f0f0',

        // ── Clay surface tokens ───────────────────────────────────────────────
        canvas:          '#fffaf0',   // Main page floor
        'surface-soft':  '#faf5e8',   // Footer, CTA bands
        'surface-card':  '#f5f0e0',   // Experience cards, secondary cards
        'surface-strong':'#ebe6d6',   // Emphasized bands
        'surface-dark':  '#0a1a1a',   // Rare dark cards
        'surface-dark-elevated': '#1a2a2a',

        // ── Clay brand accent palette (feature cards) ─────────────────────────
        brand: {
          pink:    '#ff4d8b',
          teal:    '#1a3a3a',
          lavender:'#b8a4ed',
          peach:   '#ffb084',
          ochre:   '#e8b94a',
          mint:    '#a4d4c5',
          coral:   '#ff6b5a',
        },

        // ── Semantic ──────────────────────────────────────────────────────────
        success: '#22c55e',
        warning: '#f59e0b',
        error:   '#ef4444',

        // ── accent mapped to Clay near-black primary ──────────────────────────
        // Keeps existing Tailwind class names working throughout components.
        accent: {
          DEFAULT: '#0a0a0a',
          light:   '#1f1f1f',
          dark:    '#000000',
          muted:   '#e5e5e5',
          subtle:  '#faf5e8',
        },

        // ── Neutral — warm stone scale ────────────────────────────────────────
        neutral: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
      },

      spacing: {
        '18':      '4.5rem',
        '22':      '5.5rem',
        '30':      '7.5rem',
        '128':     '32rem',
        '144':     '36rem',
        'section': '96px',   // Clay section rhythm token
      },

      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // ── Clay border-radius scale ──────────────────────────────────────────
      borderRadius: {
        'xs':   '6px',
        'sm':   '8px',
        'md':   '12px',
        'lg':   '16px',
        'xl':   '24px',
        'pill': '9999px',
        'full': '9999px',
        // Legacy alias kept so any leftover rounded-2xl still works
        '2xl':  '1rem',
        '4xl':  '2rem',
      },

      // ── Shadows — hairline-based, no heavy glows ──────────────────────────
      boxShadow: {
        'hairline': '0 0 0 1px #e5e5e5',
        'soft':     '0 4px 16px -4px rgb(0 0 0 / 0.08)',
        'soft-lg':  '0 8px 32px -8px rgb(0 0 0 / 0.10)',
        // Legacy aliases
        'card':     '0 0 0 1px #e5e5e5',
        'glow':     '0 4px 16px -4px rgb(0 0 0 / 0.08)',
      },

      animation: {
        'fade-in':       'fadeIn 0.5s ease-out',
        'fade-up':       'fadeUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
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

      zIndex: {
        'wordmark': '1000',
        'progress': '999',
        'nav':      '900',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      aspectRatio: {
        '4/3':  '4 / 3',
        '3/2':  '3 / 2',
        '2/3':  '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}
