const express = require('express');
const router = express.Router();

// MongoDB
var mongo = require('mongodb');

const ROUTE = {
    login: '/watcher/login',
    register: '/watcher/register',
    index: '/watcher',
}

// Middleware
router.use(function Guard(req, res, next) {
    let origin = req.originalUrl;

    _handleRoute(origin);
    next();
});

// Dashboard
router.get('/', (req, res) => {
    let MongoClient = mongo.MongoClient;
    let url = 'mongodb://localhost:27017/watcher';
    let data;
    MongoClient.connect(url, {useNewUrlParser:true},function(err, connection) {
        if(err) {
            console.log('Unable to connect to MongoDB.');
        } else {
            let db = connection.db('watcher');
            let users = db.collection('users');
            users.find({}).toArray((err, dbRes) => {
                if (err) {
                    console.log(err);
                } else {
                    data = JSON.stringify(dbRes);
                    res.render('watcher/index', {
                        title: 'Dashboard | Watcher',
                        layout: 'watcher',
                        users: data
                    });
                }
            });
        }
    });
});

// Login
router.get('/login', (req, res) => {
    res.render('watcher/login', {
        title: 'Login | Watcher',
        layout: 'watcher'
    });
});

// Register
router.get('/register', (req, res) => {
    res.render('watcher/register', {
        title: 'Register | Watcher',
        layout: 'watcher'
    });
});

function _handleRoute(route) {
    switch(route) {
        case ROUTE.index:
            // require auth
            console.log('need auth');
            break;
        case ROUTE.login:
            // guest
            console.log('guest');
            break;
        case ROUTE.register:
            // require temporary token
            console.log('need token');
            break;
    }
}

module.exports = router;