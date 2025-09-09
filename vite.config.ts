import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@public': resolve('public'),
      '@public/*': resolve('public/*'),
      '@shared': resolve('src/shared'),
      '@entities': resolve('src/entities'),
      '@features': resolve('src/features'),
      '@widgets': resolve('src/widgets'),
      '@pages': resolve('src/pages'),
      '@app': resolve('src/app'),
    },
  },
})
