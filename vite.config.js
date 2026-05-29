import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Base public path for built asset URLs.
  // - Dev server always uses '/'.
  // - Production builds default to the GitHub Pages *project* path so the site
  //   works at https://<user>.github.io/margo-landingpage/.
  // - CUSTOM-DOMAIN CUTOVER: build with `VITE_BASE=/` (a domain serves from the
  //   root), re-add public/CNAME, and configure DNS. See ROADMAP.md.
  base:
    command === 'build'
      ? process.env.VITE_BASE || '/margo-landingpage/'
      : '/',
}))
