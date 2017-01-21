'use strict';

const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
require('mongoose-double')(mongoose);
mongoose.Promise = global.Promise;

const config = require('./config/config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

// Swagger API docs.
app.use('/docs', express.static(path.join(__dirname, './api-docs')));
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, './api-docs/index.html'));
});

// fulfils pre-flight/promise request
app.options('*', function(req, res) {
    res.sendStatus(200);
});

app.use(morgan('dev'));

mongoose.connect(config.database, (err) => {
    if (err) {
        return console.log(err, 'Error connecting to database')
    }
    app.listen(3000, () => {
        console.log('Server started on 3000')
    })
});

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: "views/layouts/",
    partialsDir: 'views/partials'
});

app.engine('handlebars', hbs.engine);
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

var router = require('./routes');
var api = require('./routesApi');
app.use('/aerodoc/rest', api);
app.use('/', router);

module.exports = app;
