import express, { Request, Response } from 'express';
import { createServer as createHttpServer, Server as HttpServer } from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './src/api/routes.ts';
import { seedDatabase } from './src/db/seedData.ts';

dotenv.config();

const DEFAULT_PORT = 3001;
const DEFAULT_HOST = '0.0.0.0';
const PORT_RETRY_LIMIT = 20;

function readPort() {
  const port = Number(process.env.PORT);
  return Number.isInteger(port) && port > 0 ? port : DEFAULT_PORT;
}

function listenWithFallback(server: HttpServer, host: string, preferredPort: number) {
  const canRetry = !process.env.PORT;
  const maxAttempts = canRetry ? PORT_RETRY_LIMIT : 1;
  let attempts = 0;
  let port = preferredPort;

  return new Promise<number>((resolve, reject) => {
    const tryListen = () => {
      attempts += 1;

      const onListening = () => {
        server.off('error', onError);
        resolve(port);
      };

      const onError = (error: NodeJS.ErrnoException) => {
        server.off('listening', onListening);

        if (error.code === 'EADDRINUSE' && attempts < maxAttempts) {
          console.warn(`Port ${port} is in use; trying ${port + 1}.`);
          port += 1;
          tryListen();
          return;
        }

        reject(error);
      };

      server.once('listening', onListening);
      server.once('error', onError);
      server.listen(port, host);
    };

    tryListen();
  });
}

async function startServer() {
  const app = express();
  const host = process.env.HOST || DEFAULT_HOST;
  const port = readPort();
  const httpServer = createHttpServer(app);

  app.use(express.json({ limit: '5mb' }));

  // Seed database on launch
  seedDatabase().catch((err) => {
    console.error('Failed to run initial database seed:', err);
  });

  // Mount Database API endpoints
  app.use('/api', apiRouter);

  // Vite middleware in development vs static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const listeningPort = await listenWithFallback(httpServer, host, port);
  const displayHost = host === '0.0.0.0' ? 'localhost' : host;
  console.log(`Server listening on http://${displayHost}:${listeningPort}`);
}

startServer();