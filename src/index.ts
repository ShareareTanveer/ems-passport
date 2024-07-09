require('dotenv').config();

import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import logger from './configs/logger.config';
import app from './configs/express.config';

const PORT = process.env.PORT || 5000;

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nodejs-sample',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  charset: 'utf8',
  synchronize: false,
  entities: process.env.NODE_ENV !== 'production' ? ['src/**/*.entity.ts'] : ['dist/**/*.entity.js'],
  logging: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'] : ['error'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};

const connect = async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
    logger.info('Connected to database successfully');
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.error(`The connection to the database failed with error: ${e}`);
  }
};

connect();
