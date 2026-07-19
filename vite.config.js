import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Steven_Portfolio'
const isUserSiteRepository = repositoryName.toLowerCase().endsWith('.github.io')
const basePath = isUserSiteRepository ? '/' : `/${repositoryName}/`

export default defineConfig({
  base: basePath,
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  }
})
