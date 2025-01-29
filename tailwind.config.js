/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        roman: {
          50: 'var(--tw-roman-50)',
          100: 'var(--tw-roman-100)',
          200: 'var(--tw-roman-200)',
          300: 'var(--tw-roman-300)',
          400: 'var(--tw-roman-400)',
          500: 'var(--tw-roman-500)',
          600: 'var(--tw-roman-600)',
          700: 'var(--tw-roman-700)',
          800: 'var(--tw-roman-800)',
          900: 'var(--tw-roman-900)',
          950: 'var(--tw-roman-950)',
        },
        'mine-shaft': {
          50: 'var(--tw-mine-shaft-50)',
          100: 'var(--tw-mine-shaft-100)',
          200: 'var(--tw-mine-shaft-200)',
          300: 'var(--tw-mine-shaft-300)',
          400: 'var(--tw-mine-shaft-400)',
          500: 'var(--tw-mine-shaft-500)',
          600: 'var(--tw-mine-shaft-600)',
          700: 'var(--tw-mine-shaft-700)',
          800: 'var(--tw-mine-shaft-800)',
          900: 'var(--tw-mine-shaft-900)',
          950: 'var(--tw-mine-shaft-950)',
        },
        'raw-sienna': {
          50: 'var(--tw-raw-sienna-50)',
          100: 'var(--tw-raw-sienna-100)',
          200: 'var(--tw-raw-sienna-200)',
          300: 'var(--tw-raw-sienna-300)',
          400: 'var(--tw-raw-sienna-400)',
          500: 'var(--tw-raw-sienna-500)',
          600: 'var(--tw-raw-sienna-600)',
          700: 'var(--tw-raw-sienna-700)',
          800: 'var(--tw-raw-sienna-800)',
          900: 'var(--tw-raw-sienna-900)',
          950: 'var(--tw-raw-sienna-950)',
        },
        thunderbird: {
          50: 'var(--tw-thunderbird-50)',
          100: 'var(--tw-thunderbird-100)',
          200: 'var(--tw-thunderbird-200)',
          300: 'var(--tw-thunderbird-300)',
          400: 'var(--tw-thunderbird-400)',
          500: 'var(--tw-thunderbird-500)',
          600: 'var(--tw-thunderbird-600)',
          700: 'var(--tw-thunderbird-700)',
          800: 'var(--tw-thunderbird-800)',
          900: 'var(--tw-thunderbird-900)',
          950: 'var(--tw-thunderbird-950)',
        },
      },
    },
  },
  plugins: [],
};