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

app.use(morgan('dev'));
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

var ip_addr = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT || '3000';
// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/aerodoc';
//change port and db if testing
//let port = 8080 || process.env.PORT;
//let connection_string = config.database;
if (process.env.NODE_ENV === 'test') {
    port = 4000;
    connection_string = config.test;
}

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connection_string, (err) => {
    if (err) {
        return console.log(err, 'Error connecting to database')
    }
    app.listen(port, ip_addr, () => {
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
