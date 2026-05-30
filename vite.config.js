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
  // The site is served from the root of the custom domain
  //   https://2bcdef4hijkl1n5pq3stuvwxyz.jp/
  // (a custom domain serves at the root even for a GitHub Pages *project*
  // repo, so the repo name never appears in the URL). Hence base '/'.
  base: '/',
})
