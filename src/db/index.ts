import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.ts';

declare global {
  var _postgresPool: Pool | undefined;
}

export const isDbConfigured = Boolean(
  process.env.SQL_HOST && process.env.SQL_USER && process.env.SQL_DB_NAME
);

export const createPool = (): Pool | null => {
  if (!isDbConfigured) {
    return null;
  }

  if (!global._postgresPool) {
    try {
      global._postgresPool = new Pool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB_NAME,
        port: Number(process.env.SQL_PORT) || 5432,
        max: 10,
        connectionTimeoutMillis: 5000,
      });

      global._postgresPool.on('error', (err) => {
        console.warn('SQL pool connection warning:', err.message);
      });
    } catch (err) {
      console.warn('Could not initialize PostgreSQL pool:', err);
      return null;
    }
  }
  return global._postgresPool;
};

const pool = createPool();

let dbInstance: any = null;
if (pool) {
  try {
    dbInstance = drizzle(pool, { schema });
  } catch (err) {
    console.warn('Failed to initialize Drizzle ORM on SQL pool:', err);
  }
}

export const db = dbInstance;
