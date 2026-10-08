import path from 'node:path';
import express from 'express';
import config from './config/config.js';
import routes from './routes/routes.js';
import { addLocalVariables } from './middleware/global.js';

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

// Middleware
app.use(express.static(path.join(import.meta.dirname, '..', 'public'), {
    setHeaders: (res) => {
        if (config.isDevelopment) {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        }
    },
}));

// Middleware registration
app.use(addLocalVariables);

// Register routes
app.use('/', routes);

// 404 Catch-All Middleware
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.status || err.statusCode || 500;
    console.error(err.stack);
    return res.status(statusCode).send(err.message || 'Internal Server Error');
});

export default app;
