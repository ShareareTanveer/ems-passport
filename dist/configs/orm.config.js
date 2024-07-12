"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const typeorm_1 = require("typeorm");
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'sql.freedb.tech',
    username: process.env.DB_USER || 'freedb_sharearetanveer',
    password: process.env.DB_PASSWORD || 'PJXH$Asn7E8r!cX',
    database: process.env.DB_NAME || 'freedb_emspassportdb',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    charset: 'utf8',
    synchronize: false,
    entities: process.env.NODE_ENV !== 'production'
        ? ['src/**/*.entity.ts']
        : ['dist/**/*.entity.js'],
    // logging: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'] : ['error'],
    subscribers: [],
    migrations: ['src/migrations/*.ts'],
});
exports.default = dataSource;
