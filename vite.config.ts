import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import express from 'express';
import { apiRouter } from './src/api/routes.ts';
import { seedDatabase } from './src/db/seedData.ts';

function backendApiDevPlugin(): Plugin {
  return {
    name: 'backend-api-dev',
    configureServer(server) {
      seedDatabase().catch((err) => {
        console.error('Error seeding database in dev mode:', err);
      });

      const devApp = express();
      devApp.use(express.json({ limit: '5mb' }));

      // Mount all Database REST API routes
      devApp.use('/api', apiRouter);

      server.middlewares.use(devApp);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), backendApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three') || id.includes('@react-three')) {
                return 'vendor-three';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('lenis')) {
                return 'vendor-lenis';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              return 'vendor-misc';
            }
          },
        },
      },
      chunkSizeWarningLimit: 800,
    },
    server: {
      port: 3001,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
