require('dotenv/config');
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nodejs-sample',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  charset: 'utf8',
  synchronize: false,
  entities:
    process.env.NODE_ENV !== 'production'
      ? ['src/**/*.entity.ts']
      : ['dist/**/*.entity.js'],
  // logging: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'] : ['error'],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
