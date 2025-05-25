// vite.config.ts (or vite.config.js)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Relationship Nurturer',
        short_name: 'Nurturer',
        description: 'Your personal assistant for nurturing contact relationships.',
        theme_color: '#4CAF50',
        icons: [
          {
            src: 'icons/icon-192x192.png', // Relative to public folder
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable_icon.png',
            sizes: '196x196',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'], // Assets to precache
      },
      // IMPORTANT: Enable PWA features in development mode
      devOptions: {
        enabled: true,
      },
    }),
  ],
});