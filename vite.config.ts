import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // Assurez-vous que le répertoire de sortie est correctement configuré
  },
  base: '/',
  plugins: [react()],
})
