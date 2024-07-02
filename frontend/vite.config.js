import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Since your index.html is at the root
  build: {
    outDir: 'dist', // Where the production build will be generated
  },
  server: {
    open: true,
  },
})
