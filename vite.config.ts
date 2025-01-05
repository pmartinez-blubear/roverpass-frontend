import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // Activa el uso de test globales (como describe, it, etc.)
    environment: 'jsdom', // Usa jsdom para emular el DOM en las pruebas
    setupFiles: './src/setupTests.ts', // Archivo de configuración inicial para pruebas
  },
})
