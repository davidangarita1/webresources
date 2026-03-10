/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path';

const alias = {
  '@components': path.resolve(__dirname, './src/components'),
  '@assets': path.resolve(__dirname, './src/assets'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  '@store': path.resolve(__dirname, './src/store'),
  '@services': path.resolve(__dirname, './src/services'),
  '@types': path.resolve(__dirname, './src/types'),
  '@utils': path.resolve(__dirname, './src/utils'),
};

export default defineConfig({
  resolve: { alias },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Gestor de Marcadores',
        short_name: 'Marcadores',
        description: 'Gestiona y explora tu colección de marcadores web',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
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
        'src/**/*.css',
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
