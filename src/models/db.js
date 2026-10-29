import { Pool } from 'pg';
import config from '../config/config.js';

if (!process.env.DB_URL) {
    throw new Error('DB_URL is required. Configure your PostgreSQL connection in .env or the host environment.');
}

const pool = new Pool({
    connectionString: process.env.DB_URL,
    connectionTimeoutMillis: 5000,
    max: 10,
});

pool.on('error', (error) => {
    console.error('PostgreSQL idle connection error:', error.code || error.name);
});

const db = {
    async query(text, params) {
        const start = Date.now();
        const result = await pool.query(text, params);
        if (config.isDevelopment && process.env.ENABLE_SQL_LOGGING === 'true') {
            console.log('Executed query:', {
                text: text.replace(/\s+/g, ' ').trim(),
                duration: `${Date.now() - start}ms`,
                rows: result.rowCount,
            });
        }
        return result;
    },
    connect: () => pool.connect(),
    close: () => pool.end(),
};

export default db;
