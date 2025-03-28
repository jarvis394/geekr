import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      VitePWA({
        srcDir: 'src',
        filename: 'service-worker.ts',
        injectRegister: false,
        manifest: false,
        workbox: {
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 3,
        },
      }),
    ],
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
