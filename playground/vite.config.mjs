import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

const playgroundDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: playgroundDir,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(playgroundDir, '../src'),
    },
  },
  publicDir: resolve(playgroundDir, '../public'),
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 5173,
  },
});
