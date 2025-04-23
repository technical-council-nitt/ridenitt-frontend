import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      name: 'Ride NITT | Carpool like never before',
      short_name: 'Ride NITT',
      description: 'Ride NITT is a carpooling platform for the students of NIT Trich by the Technical Club of NIT Trichy',
      theme_color: '#008955',
      icons: [
        {
          src: 'logo192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'logo512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
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