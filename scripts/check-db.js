import db from '../src/models/db.js';
import { testConnection } from '../src/models/setup.js';

try {
    await testConnection();
} catch (error) {
    console.error('PostgreSQL connection failed:', error.code || error.name);
    process.exitCode = 1;
} finally {
    await db.close();
}
