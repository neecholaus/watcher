const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const session = require('express-session');
const dotenv = require('dotenv');

// Initialize ENV
dotenv.config();

// Configure templating engine
let app = express();
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Support partial templates
hbs = handlebars.create();
hbs.getPartials();

// Handle request bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Allow sessions
app.use(session({
    secret: 'string',
    saveUninitialized: false,
    resave: false
}));

// Main page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'nick neuman'
    });
});

// Watcher
let watcher = require('./routes/watcher');
app.use('/watcher', watcher);


app.listen(3000, 'localhost');