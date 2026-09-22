require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 3000;


// Serve static files from public directory (prevent stale CSS caching in dev)
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res) => {
        if (NODE_ENV.includes('dev')) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        }
    }
}));
/**
 * Global template variables middleware
 * 
 * Makes common variables available to all EJS templates without having to pass
 * them individually from each route handler
 */
app.use((req, res, next) => {
    // Make NODE_ENV available to all templates
    res.locals.NODE_ENV = NODE_ENV.toLowerCase() || 'production';

    // Continue to the next middleware or route handler
    next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

/**
 * Routes
 */
app.get('/', (req, res) => {
    const title = 'Welcome Home';
    res.render('home', { title });
});

app.get('/about', (req, res) => {
    const title = 'About Me';
    res.render('about', { title });
});

app.get('/products', (req, res) => {
    const title = 'Our Products';
    res.render('products', { title });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// When in development mode, start a WebSocket server for live reloading
if (NODE_ENV.includes('dev')) {
    (async () => {
        try {
            const ws = await import('ws');
            const wsPort = parseInt(port) + 1;
            const wsServer = new ws.WebSocketServer({ port: wsPort });

            wsServer.on('listening', () => {
                console.log(`WebSocket server is running on port ${wsPort}`);
            });

            wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });

        // Graceful shutdown on restart
        process.once('SIGINT', () => wsServer.close());
        process.once('SIGTERM', () => wsServer.close());
    } catch (error) {
            console.error('Failed to start WebSocket server:', error);
        }
    })();
}