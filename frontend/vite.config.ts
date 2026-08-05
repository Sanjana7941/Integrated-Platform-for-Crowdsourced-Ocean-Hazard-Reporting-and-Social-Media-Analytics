import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Integrated-Platform-for-Crowdsourced-Ocean-Hazard-Reporting-and-Social-Media-Analytics/',
})
