const db = require('../db.js');
const TABLE = 'cameras';

exports.get = function(constraints) {
    return db.get(TABLE, constraints);
}