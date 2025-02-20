import { defineConfig } from 'vite'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
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