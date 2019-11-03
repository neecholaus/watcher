const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const rToken = require('rand-token');


// MongoDB Config
let mongoUser = process.env.MONGO_USER;
let mongoPass = process.env.MONGO_PASS;
let authUrl = `mongodb://${mongoUser}:${mongoPass}@localhost:27017/watcher?authSource=admin`;
mongoose.connect(authUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function(err) {
    if(err) throw err;
});


// Models
const User = require('../models/user.js');
const Token = require('../models/token.js');
const Capture = require('../models/capture.js');


// Route constants
const ROUTE = {
    login: '/watcher/login',
    register: '/watcher/register',
    index: '/watcher',
    logout: '/watcher/logout',
    gen_invite: '/watcher/generate-invite',
    gen_token: '/wathcer/gen-token',
    upload: '/watcher/upload',
    upload_api: '/watcher/api-upload',
    recent_capture: '/watcher/most-recent',
    times: '/watcher/times',
    capture: '/watcher/capture'
};

/**
 * Image path parameter, returns an image if path is valid.
 */
router.param('path', function(req, res, next, path) {
    fs.readFile(__dirname + '/../uploads/' + path, function(err, data) {
        if(err) {
            res.status(500);
            res.end();
        } else {
            res.status(200);
            res.set('Content-Type', 'image/jpg');
            res.send(data);
            res.end();
        }
    });
});

/**
 * Primary auth middleware.
 */
router.use(_handleRoute);

// Routes included in react router
const clientSideRouteList = [
    '(/upload-image)',
    '(/generate-invite)',
    '(/capture-canvas)',
    '(/login)'
];
const clientSideRoutes = new RegExp(`${clientSideRouteList.join('|')}`, 'g');

/**
 * Sends react app.
 */
router.get(['/', clientSideRoutes], (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/watcher.html'));
});

/**
 * Verifies that passed token is valid, generates new if so and returns it.
 */
router.param('token', function(req, res, next, token) {
    let newToken = rToken.generate(25);
    User.findOneAndUpdate({token}, {$set: {token:newToken}}, (err, data) => {
        if(data) {
            req.session.user = data;
            res.json({
                valid: true,
                token: newToken
            });
            res.end();
        }
        else next();
    });
});
router.get('/verify-token/:token', (req, res) => {
    res.json({
        valid: false
    });
    res.end();
})

/**
 * Handle login submission
 */
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, data) => {
        let passwordMatch = data ? bcrypt.compareSync(req.body.password, data.password): false;
        if(data && passwordMatch) {
            // if user has not been used yet, set initial token
            if(!data.token) {
                data.token = rToken.generate(25);
                User.findOneAndUpdate(
                    {email: data.email},
                    {$set: {token: data.token}
                }).exec();
            }

            req.session.user = data;
            res.json({
                success: true,
                token: data.token
            });
            res.end();
        } else {
            if(!data) {
                res.json({
                    success: false,
                    message: 'Email is not tied to an account'
                });
                res.end();
                return;
            }

            if(!passwordMatch) {
                res.json({
                    success: false,
                    message: 'Password is incorrect'
                });
                res.end();
                return;
            }
        }
    });
});

/**
 * Handle logout
 */
router.post('/logout', (req, res) => {
    req.session.user = null;
    res.status(200);
    res.end();
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
                errors: req.session.errors,
                successes: req.session.successes
            });
            req.session.errors = [];
            req.session.successes = [];
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
 * Handling file uploads
 *
 * @type {DiskStorage|DiskStorage}
 */
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        let filename = Date.now().toString() + path.extname(file.originalname);
        new Capture({
            _id: new mongoose.Types.ObjectId(),
            path: `${process.env.UPLOAD_PATH}/${filename}`,
            filename: filename,
            taken_at: req.body.taken_at
        })
            .save()
            .then((result) => {
                cb(null, filename);
            })
            .catch((err) => console.log(err));
    }
});
const upload = multer({storage: storage});


/**
 * Admin test upload
 */
router.post('/upload', upload.any(), (req, res) => {
    res.redirect('/watcher/capture-canvas');
});

/**
 * API route for uploading image
 */
router.post('/api-upload', (req, res) => {
    const filename = Date.now().toString() + '.png';
    let file = Buffer.from(req.body.file);

    fs.writeFileSync(`${process.env.UPLOAD_PATH}/${filename}`, file);

    new Capture({
        _id: new mongoose.Types.ObjectId(),
        path: `/uploads/${filename}`,
        filename: filename,
        taken_at: Date.now()
    })
        .save()
        .then(result => {
            console.log('Capture created.');
        })
        .catch(err => {
            console.log(err);
        });

        res.status(200);
        res.end();
});


/**
 * API route for fetching the most recent image
 */
router.post('/most-recent', (req, res) => {
    Capture.findOne().sort({taken_at: -1})
        .then((result) => {
            res.status(200);
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.end();
        });
});


router.post('/times', (req, res) => {
    Capture.find().select({taken_at:1, filename:1, _id:0}).sort({taken_at: -1})
        .then(result => {
            res.status(200);
            res.json(result);
            res.end();
        })
        .catch(err => {
            res.status(500);
            res.end();
        });
});


/**
 * Private route for viewing captures
 */
router.get('/capture/:path', (req, res) => {});


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
    // Removes trailing forward slashes
    let origin = req.originalUrl.replace(/\/+(?=$|\s)/g, '').split('?')[0];

    switch(origin) {
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
        case ROUTE.upload:
            if(!req.session.user || !req.session.user.admin) {
                res.redirect('/watcher/login');
                return false;
            }
            break;
        case ROUTE.recent_capture:
            if(!req.session.user) {
                res.status(401);
                res.end();
            }
            break;
        case ROUTE.times:
            if(!req.session.user) {
                res.status(401);
                res.end();
            }
            break;
        case ROUTE.upload_api:
            let token = req.headers['authorization'].split(' ').pop();
            let buffer1 = Buffer.from(token, 'base64');
            let data = buffer1.toString().split(':');

            let apiUser = data[0];
            let apiPwd = data[1];

            if(apiUser !== process.env.PI_USER || apiPwd !== process.env.PI_PASS) {
                res.status(403);
                res.end();
                return false;
            }

            break;
    }

    next();
}

module.exports = router;