import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/orchrd_portal/", // 🔴 your repo name
  plugins: [react()],
})