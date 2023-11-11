/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },

      typography: {
        DEFAULT: {
          css: {
            code: {
              '&::before': { content: 'none !important' },
              '&::after': { content: 'none !important' },
              '&': { fontWeight: 'normal' },
            },

            p: {
              '&::before': { content: 'none !important' },
              '&::after': { content: 'none !important' },
              '&': { fontWeight: 'normal' },
            },
          },
        },
      },
    },
  },
};
