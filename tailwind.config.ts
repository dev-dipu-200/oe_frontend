import type { Config } from 'tailwindcss'

export default {
  prefix: 'oe-',
  content: [
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app/**/*.vue',
    './src/error.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    'oe-bg-gray-50',
    'oe-min-h-screen',
    'oe-max-w-2xl',
    'oe-mx-auto',
    'oe-bg-white',
    'oe-shadow-lg',
    'oe-rounded-lg',
    'oe-p-6',
    'oe-text-3xl',
    'oe-font-bold',
    'oe-text-gray-800',
    'oe-mb-4',
    'oe-space-y-4',
    'oe-text-lg',
    'oe-font-semibold',
    'oe-ml-2',
    'oe-px-3',
    'oe-py-1',
    'oe-bg-blue-100',
    'oe-text-blue-800',
    'oe-rounded-full',
    'oe-text-gray-700',
    'oe-flex',
    'oe-gap-4',
    'oe-mt-6',
    'oe-px-6',
    'oe-py-3',
    'oe-bg-green-600',
    'hover:oe-bg-green-700',
    'oe-text-white',
    'oe-font-medium',
    'oe-transition-colors',
    'oe-bg-red-600',
    'hover:oe-bg-red-700',
    'oe-mt-12'
  ]
} satisfies Config