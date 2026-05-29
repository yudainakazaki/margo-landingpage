import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Custom domain is served from the root, so the default base ('/') is correct.
  // If you ever deploy to a GitHub Pages project subpath instead of a custom
  // domain, set base to '/<repo-name>/'.
  base: '/',
})
