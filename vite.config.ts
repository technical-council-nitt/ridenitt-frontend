import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    //vite proxy is not needed in production, vercel rewrite rules are used instead
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: false
      },
      '/auth': {
        target: "http://localhost:3000",
        changeOrigin: false
      }
    }
  }
})