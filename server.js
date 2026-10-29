import app from './src/app.js';
import config from './src/config/config.js';
import db from './src/models/db.js';
import { setupDatabase, testConnection } from './src/models/setup.js';

let server;
let isShuttingDown = false;

async function shutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`${signal} received. Closing the HTTP server.`);
    const timeout = setTimeout(() => process.exit(1), 10000);
    timeout.unref();
    try {
        if (server?.listening) {
            await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
        }
        await db.close();
        console.log('HTTP server and database pool closed.');
    } catch (error) {
        console.error('Shutdown failed:', error.code || error.name);
        process.exitCode = 1;
    } finally {
        clearTimeout(timeout);
    }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

try {
    await testConnection();
    await setupDatabase();
    if (!isShuttingDown) {
        server = app.listen(config.port, (error) => {
            if (error) {
                console.error('HTTP server failed to start:', error.code || error.name);
                process.exitCode = 1;
                void shutdown('Startup failure');
                return;
            }
            console.log(`Server is running at http://localhost:${config.port}`);
        });
    }
} catch (error) {
    console.error('Database initialization failed. Check DB_URL and PostgreSQL availability:', error.code || error.name);
    process.exitCode = 1;
    await shutdown('Startup failure');
}
