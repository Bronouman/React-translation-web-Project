import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy same-origin API requests to Express during local Vite development.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
