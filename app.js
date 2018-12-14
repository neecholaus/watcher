const express = require('express');
const expressSession = require('express-session');
const handles = require('express-handlebars');
const path = require('path');
const bcrypt = require('bcrypt');

// DB
const USER = require('./controllers/users.js');

let app = express();

// Handle file parsing
app.engine('handlebars', handles({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'handlebars');

// Middleware for parsing payload
app.use(express.json());

// Allow loading assets
app.use(express.static(path.join(__dirname, 'public')));

// Session options
app.use(expressSession({
    secret: 'string',
    saveUninitialized: false,
    resave: false
}));

// Home
app.get('/', (req, res) => {
    res.render('index');
});


// Watcher
app.get('/watcher', (req, res) => {
    if(req.session.user) {
        res.render('watcher/home', {
            user: req.session.user,
            script: 'watcher/home',
            layout: 'watcher'
        });
    } else {
        res.redirect('watcher/login');
    }
});

// Log into watcher
app.get('/watcher/login', (req, res) => {
    res.render('watcher/login', {
        script: 'watcher/login',
        layout: 'watcher'
    });
});

// Submit Login credentials
app.post('/watcher/login', (req, res) => {
    let valid = validateAuth(req.body);

    if(valid) {
        req.session.user = req.body;
    };

    res.send(valid);
});

// Log out from watcher
app.get('/watcher/logout', (req, res) => {
    req.session.user = null;

    res.redirect('/watcher');
});


app.listen(4200);

// Used to return true or false if passed user credentials are valid
function validateAuth(credentials) {
    let auth = USER.get({
        username: credentials.username,
        password: credentials.password // need to hash
    });

    return auth.length == 1;
}