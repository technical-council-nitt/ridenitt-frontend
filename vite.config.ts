import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['ridenitt.in', 'www.ridenitt.in'],
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL || "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },
      '/auth': {
        target: process.env.BACKEND_URL || "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    },  
  }
})
