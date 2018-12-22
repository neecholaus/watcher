const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

// MongoDB
var mongo = require('mongodb');

// Configure templating engine
let app = express();
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Support partial templates
hbs = handlebars.create()
hbs.getPartials();

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Main page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'nick neuman'
    });
});

// Watcher
let watcher = require('./routes/watcher');
app.use('/watcher', watcher);


app.listen(8000);