import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        src: fileURLToPath(new URL('./src', import.meta.url)),
        public: fileURLToPath(new URL('./public', import.meta.url)),
      },
    },
  }
})
