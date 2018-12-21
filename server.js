const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

let app = express();

// Configure templating engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Main page
app.get('/', (req, res) => {
    res.render('index', {'title': 'nick neuman'});
});

// Watcher
app.get('/watcher', (req, res) => {
    res.render('index', {'title': 'watcher'});
});

app.listen(8000);