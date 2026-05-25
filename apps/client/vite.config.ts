import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(here, 'src/renderer'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(here, 'src/renderer'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
  build: {
    outDir: path.join(here, 'dist/renderer'),
    emptyOutDir: true,
  },
});
