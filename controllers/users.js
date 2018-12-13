const db = require('../db.js');
const TABLE = 'users';

exports.get= function(constraints) {
    return db.get(TABLE, constraints);
}