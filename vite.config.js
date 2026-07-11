import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'favicon.ico', 'favicon-32.png'],
      manifest: {
        name: 'Pokémon Gym',
        short_name: 'Pokémon Gym',
        description: 'Tracker allenamenti in palestra con collezione carte Pokémon',
        theme_color: '#8b7cf6',
        background_color: '#eef0f7',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/limitlesstcg\.nyc3\.cdn\.digitaloceanspaces\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cri-card-images',
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})
