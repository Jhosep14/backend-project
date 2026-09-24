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


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));



// Routes

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