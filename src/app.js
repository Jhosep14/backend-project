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
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || err.statusCode || 500;
    const template = status === 404 ? '404' : '500';

    console.error(err.stack);

    const context = {
        title: status === 404
            ? 'Page Not Found'
            : 'Server Error',
        error: config.isDevelopment
            ? err.message
            : 'An error occurred.',
        stack: config.isDevelopment
            ? err.stack
            : null,
        NODE_ENV: config.nodeEnv,
    };

    try {
        return res
            .status(status)
            .render(`errors/${template}`, context);
    } catch (renderError) {
        console.error(renderError);

        return res
            .status(status)
            .send(`<h1>Error ${status}</h1>`);
    }
});

export default app;
