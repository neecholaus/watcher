var express = require('express');
var router = express.Router();

router.use(function auth (req, res, next) {
    console.log('using api');

    next();
});

router.get('/', (req, res) => {
    res.send('api');
});

module.exports = router;