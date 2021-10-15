import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FCE8E8',
          200: '#E6E6E6',
          300: '#D6D6D6',
          400: '#B8B8B8',
          500: '#999999',
          600: '#EB5757',
          700: '#5C5C5C',
          800: '#454545',
          900: '#2E2E2E',
        },
        gray: {
          100: '#F5F5F5',
          200: '#E6E6E6',
          300: '#D6D6D6',
          400: '#B8B8B8',
          500: '#999999',
          600: '#8A8A8A',
          700: '#5C5C5C',
          800: '#454545',
          900: '#2E2E2E',
        },
        warning: {
          600: '#FFD769',
        },
      },
    },
  },
})
