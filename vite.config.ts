/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

const alias = {
  '@components': path.resolve(__dirname, './src/components'),
  '@assets': path.resolve(__dirname, './src/assets'),
  '@models': path.resolve(__dirname, './src/models'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  '@context': path.resolve(__dirname, './src/context/index.ts'),
};

export default defineConfig({
  resolve: { alias },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    alias,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/test/**',
        'src/**/*.scss',
        'src/data/**',
        'src/assets/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
