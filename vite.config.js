import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// base: '/portofolio/' → for project page (azrialahmad.github.io/portofolio/)
// base: '/'            → for custom domain (currently active)
export default defineConfig({
  plugins: [react(), imagetools()],
  base: '/',
  build: {
    // Keep images as real files (they're served responsively via srcset).
    assetsInlineLimit: 0,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
    css: false,
  },
})
