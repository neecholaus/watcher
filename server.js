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

// Main page but redirect for now
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/portfolio.html');
});

// app.get('/watcher', (req, res) => {
//     res.sendFile(__dirname + '/views/watcher.html');
// });

// Watcher
let watcher = require('./routes/watcher');
app.use('/watcher', watcher);


app.listen(3000, 'localhost');