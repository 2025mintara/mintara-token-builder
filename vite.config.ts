import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: "./", // 🔧 Bu satır yönlendirme hatalarını çözer
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: true
  },
  server: {
    port: 5173,
    open: true
  }
})
