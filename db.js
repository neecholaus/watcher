const fs = require('fs');
const path = require('path');

const DB_PATH = './db/';

function parseData(data) {
    let items = data.split('\n');
    let parsedItems = [];

    for(let i = 0; i < items.length; i++) {
        let jsonItem = JSON.parse(items[i]);

        parsedItems.push(jsonItem);
    }

    return parsedItems;
}

exports.get = function(tableName, params={}) {
    // Get table path
    let tablePath = path.resolve(DB_PATH, tableName + '.txt');
    // Ensure table is legit
    if(!fs.existsSync(tablePath)) throw 'Table does not exist.';
    // Read table
    let string = fs.readFileSync(tablePath, {encoding: 'utf-8'})
    // Convert to workable json
    let data = parseData(string);
    // If no given constraints, return all data
    if(!Object.keys(params).length) return data;

    let validatedData = [];
    // Loop through each item
    for(let i = 0; i < data.length; i++) {
        let match = true;
        // Loop through paramaters given (0 loops if no constraints)
        for(let constraint in params) {
            if (data[i][constraint] !== params[constraint]) match = false;
        }

        if(match) {
            validatedData.push(data[i]);
        }
    }

    return validatedData;
}