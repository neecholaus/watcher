const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// MongoDB Config
let mongoUser = process.env.MONGO_USER;
let mongoPass = process.env.MONGO_PASS;
let authUrl = `mongodb://${mongoUser}:${mongoPass}@localhost:27017/watcher?authSource=admin`;
mongoose.connect(authUrl, {useNewUrlParser: true}, function(err) {
    if(err) throw err;
});

// Models
const User = require('../models/user.js');
const Token = require('../models/token.js');

// Route constants
const ROUTE = {
    login: '/watcher/login',
    register: '/watcher/register',
    index: '/watcher',
    logout: '/watcher/logout',
    gen_invite: '/watcher/generate-invite',
    gen_token: '/wathcer/gen-token'
};


/**
 * Middleware
 */
router.use(_handleRoute);


/**
 * Display dashboard
 */
router.get('/', (req, res) => {
    res.render('watcher/index', {
        title: 'Dashboard | Watcher',
        layout: 'watcher',
        user: req.session.user
    });
});


/**
 * Display login form
 */
router.get('/login', (req, res) => {
    res.render('watcher/login', {
        title: 'Login | Watcher',
        layout: 'watcher',
        errors: req.session.errors
    });
    req.session.errors = [];
});


/**
 * Handle login submission
 */
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, data) => {
        let passwordMatch = data ? bcrypt.compareSync(req.body.password, data.password): false;
        if(data && passwordMatch) {
            req.session.user = data;
            res.redirect('/watcher');
        } else {
            if(!data) req.session.errors.push('Email is not tied to an account');
            if(!passwordMatch) req.session.errors.push('Password is incorrect');
            res.redirect('/watcher/login');
        }
    });
});


/**
 * Handle logout
 */
router.get('/logout', (req, res) => {
    req.session.user = null;

    res.redirect('/watcher/login');
    return;
});


/**
 * Display register form
 */
router.get('/register', (req, res) => {
    let suppliedToken = req.query.token;

    // Find token
    Token.findOne({token: suppliedToken}, (err, token) => {
        // Ensure token is valid and has not expired
        if(token && new Date() < token.expired_at) {
            res.render('watcher/register', {
                title: 'Register | Watcher',
                layout: 'watcher',
                token: suppliedToken,
                errors: req.session.errors
            });
            req.session.errors = [];
        } else {
            req.session.errors.push('Token was invalid.');
            res.redirect('/watcher/login');
        }
    });
});


/**
 * Handle register submission
 */
router.post('/register', (req, res) => {
    let suppliedToken = req.body.token;

    // Ensure token is valid
    Token.findOne({token: suppliedToken}, (err, token) => {
        // Make sure token has not expired
        if(token && new Date() < token.expired_at) {
            // Make sure user does not exist
            User.findOne({email: req.body.email}, (err, user) => {
                if (user) {
                    req.session.errors.push('User already exists with that email.');
                    res.redirect('/watcher/register');
                } else {
                    // Create user
                    let user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 8)
                    })
                        .save()
                        .then(result => {
                            req.session.user = result;
                            res.redirect('/watcher');
                        })
                        .catch(err => {
                            req.session.errors.push('Something went wrong.');
                            res.redirect('/watcher/register')
                        });
                }
            });
        } else {
            req.session.errors.push('Your token has expired.');
            res.redirect('/watcher/login');
        }
    });
});


/**
 * Admin route for generating invite links
 */
router.get('/generate-invite', (req, res) => {
    res.render('watcher/admin/generate-invite', {
        title: 'Send Invite',
        user: req.session.user,
        layout: 'watcher',
        errors: req.session.errors
    });
    req.session.errors = [];
});


/**
 * Admin route for generating new token
 */
router.post('/gen-token', (req, res) => {
    let today = new Date();
    let newToken = `${today.getFullYear()}${today.getMonth()}${today.getDay()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}${today.getMilliseconds()}`;

    new Token({
        _id: new mongoose.Types.ObjectId(),
        token: newToken
    }).save(function(err) {
            if(err) {
                res.status(500);
                res.end();
            }

            res.status(200);
            res.json({
                token: newToken
            });
        });
});


/**
 * Route middleware
 *
 * @param req
 * @param res
 * @param next
 * @returns {boolean}
 * @private
 */
function _handleRoute(req, res, next) {
    let origin = req.originalUrl;
    if(!req.session.errors) req.session.errors = [];

    switch(origin) {
        case ROUTE.index:
            if(!req.session.user) {
                res.redirect('/watcher/login');
                return false;
            }
            break;
        case ROUTE.login:
            if(req.session.user) {
                res.redirect('/watcher');
                return false;
            }
            break;
        case ROUTE.register:
            if(req.session.user) {
                res.redirect('/watcher');
                return false;
            }
            break;
        case ROUTE.gen_invite:
            if(!req.session.user || !req.session.user.admin) {
                res.redirect('/watcher/login');
                return false;
            }
            break;
        case ROUTE.gen_token:
            if(!req.session.user || !req.session.user.admin) {
                res.redirect('/watcher/login');
                return false;
            }
            break;
    }

    next();
}

module.exports = router;