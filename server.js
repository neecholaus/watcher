const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// Initialize ENV
dotenv.config();

// Configure templating engine
let app = express();

// Handle request bodies
app.use(bodyParser.urlencoded({limit:'100mb',extended: false}));
app.use(bodyParser.json({limit:'100mb'}));

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// allow sessions
app.use(session({
    secret: process.env.APP_SECRET,
    saveUninitialized: false,
    resave: false
}));

// main page
app.get('/', (req, res) => {
    res.end('restructuring...');
});

// watcher
let watcher = require('./routes/watcher');
app.use('/watcher', watcher);


app.listen(3000, 'localhost');