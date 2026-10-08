import app from './src/app.js';
import config from './src/config/config.js';

const server = app.listen(config.port, (error) => {
    if (error) {
        console.error('Failed to start the HTTP server:', error);
        process.exitCode = 1;
        return;
    }

    console.log(`Server is running at http://localhost:${config.port}`);
});

let isShuttingDown = false;

function shutdown(signal) {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;
    console.log(`${signal} received. Closing the HTTP server.`);

    server.close((error) => {
        if (error) {
            console.error('Failed to close the HTTP server:', error);
            process.exitCode = 1;
            return;
        }

        console.log('HTTP server closed.');
    });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
