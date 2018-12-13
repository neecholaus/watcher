const express = require('express');
const handles = require('express-handlebars');
const path = require('path');

let app = express();

// Handling HTML/CSS file parsing
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

// Home
app.get('/', (req, res) => {
    console.log(req);
    res.render('index');
});


// Watcher
app.get('/watcher', (req, res) => {
    let auth = handleAuth(req.headers);
    
    if(auth) {
        res.render('watcher/home', {user: auth, script: 'watcher'});
    } else {
        res.render('watcher/login', {script: 'watcher/login', layout: 'watcher'});
    }
});
app.post('/watcher', (req, res) => {
    res.send(validateAuth(req.body));
});

app.listen(4200);




function handleAuth(headers) {
    if(!headers.authorization) {
        return false;
    }

    let encodedString = headers.authorization;
    
    let buff = Buffer.from(encodedString.split(' ')[1], 'base64');
    
    let split = buff.toString().split(':');

    let auth = {
        user: split[0],
        pass: split[1]
    }

    return validateAuth(auth);
}

function validateAuth(auth) {
    // ensure passed auth is in DB
    const IN_DB = true;

    token = 'GENERICTOKENWITHTIMEENCODED';



    res = {
        token: IN_DB ? token : null
    };

    return res;
}