import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://MAD-422160846610.github.io',
  base: '/glitchcat-v3-site',
  vite: {
    plugins: [tailwindcss()],
  },
});