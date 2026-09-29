import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Add this line to force relative asset paths
  build: {
    chunkSizeWarningLimit: 1600, // Increase threshold to 1600 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Puts all third-party code into a vendor.js file
          }
        },
      },
    },
  },
})
