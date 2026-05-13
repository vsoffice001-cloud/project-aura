import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite config for the playground only — NOT used for library build.
// Library build uses tsc via tsconfig.build.json.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  root: 'playground',
  server: {
    port: 5175,
  },
});
