import fs from 'node:fs';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import tsrConfig from './tsr.config.json';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  server:
    mode === 'staging'
      ? {
          proxy: {
            '/index.php': {
              target: 'http://192.168.0.1:90',
              changeOrigin: true,
            },
          },
        }
      : {},
  build: {
    rollupOptions: {
      output: {
        entryFileNames:
          mode !== 'production'
            ? 'assets/[name].js'
            : 'assets/[name].[hash].js',
        chunkFileNames:
          mode !== 'production'
            ? 'assets/[name].js'
            : 'assets/[name].[hash].js',
        assetFileNames:
          mode !== 'production'
            ? 'assets/[name][extname]'
            : 'assets/[name].[hash][extname]',
      },
    },
    sourcemap: mode !== 'production',
  },
  plugins: [
    tanstackRouter({
      ...tsrConfig,
      target: tsrConfig.target as 'react',
      quoteStyle: tsrConfig.quoteStyle as 'single',
      autoCodeSplitting: true,
    }),
    tsconfigPaths(),
    react(),
    {
      name: 'delete-mock',
      writeBundle() {
        fs.rmSync('dist/mockServiceWorker.js');
      },
    },
  ],
}));
