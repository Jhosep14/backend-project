import { readFile } from 'node:fs/promises';
import db from './db.js';

const testConnection = async () => {
    await db.query('SELECT NOW() AS current_time');
    console.log('PostgreSQL connection successful.');
};

const setupDatabase = async () => {
    const seedSQL = await readFile(new URL('./sql/seed.sql', import.meta.url), 'utf8');
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        // Serialize setup when multiple application instances start together.
        await client.query('SELECT pg_advisory_xact_lock(340, 3)');
        await client.query(seedSQL);
        await client.query('COMMIT');
        console.log('Database tables and course data are ready.');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export { setupDatabase, testConnection };
