/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"DM Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem',   { lineHeight: '1' }],
        '9xl': ['8rem',   { lineHeight: '1' }],
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
        /**
         * Accent — deep steel blue, calibrated for warm light backgrounds.
         * Referencing the blue-gray of silicon wafer inspection optics,
         * SEM monitor displays, and process-tool interfaces.
         */
        accent: {
          DEFAULT: '#1D6FA4',  // deep muted steel blue
          light:   '#4D9CC7',  // lighter blue
          dark:    '#155D8A',  // deeper
          muted:   '#BAD9EF',  // very light blue (badge backgrounds)
          subtle:  '#EBF4FB',  // near-white blue tint
        },

        /**
         * Neutral — warm stone family (slightly warm undertone vs. pure gray).
         * The warmth references bone, parchment, and cream-colored lab surfaces
         * rather than cold tech-gray. The dark end anchors the footer.
         */
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

        /**
         * Canvas — warm bone/ivory page background.
         * The tone of a high-quality technical paper or scientific journal page.
         */
        canvas: '#F4F1EC',

        /**
         * Blush — warm pink-beige outer page canvas.
         * Soft, editorial, premium.
         */
        blush: {
          DEFAULT: '#F5E8E3',
          50:  '#FDF5F2',
          100: '#F9EDE7',
          200: '#F0D5CB',
          300: '#E7BBAE',
        },

        /**
         * Surface — warm off-white inner container.
         */
        surface: {
          DEFAULT: '#FEFCF9',
          warm:    '#F8F4EF',
        },
      },

      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      borderRadius: {
        '4xl': '2rem',
      },

      /**
       * Shadows — gentle elevation for cards on warm light background.
       * No colored glow — that reads as decorative. These are functional shadows.
       */
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'soft':    '0 4px 16px -4px rgb(0 0 0 / 0.08)',
        'soft-lg': '0 8px 32px -8px rgb(0 0 0 / 0.10)',
        'glow':    '0 0 0 1px rgb(29 111 164 / 0.15), 0 4px 16px -4px rgb(29 111 164 / 0.12)',
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
