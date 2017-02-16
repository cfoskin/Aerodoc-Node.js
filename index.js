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
const mdk_express = require('datawire_mdk_express');
const mdk_winston = require('datawire_mdk_winston');
var requestId = require('request-id/express');

var mdk = require("datawire_mdk").mdk;
var MDK = mdk.start();
process.on("beforeExit", function (code) {
    MDK.stop();
});
var service = 'aerodoc-service';
var host = 'localhost';

app.use(mdk_express.mdkSessionStart);
app.use(requestId());
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

//change port and db if testing
let port = 3000 || process.env.PORT;
let db = config.database;
if (process.env.NODE_ENV === 'test') {
    port = 4000 || process.env.PORT;
    db = config.test;
}
MDK.register(service, "1.0.0", "http://" + host + ":" + port.toString());

mongoose.connect(db, (err) => {
    if (err) {
        return console.log(err, 'Error connecting to database')
    }
    app.listen(port, () => {
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

app.use(function(req, res, next) {
    var ssn = MDK.join(req.get(mdk.MDK.CONTEXT_HEADER));
    ssn.info(service, "Received a request.");
});

module.exports = app;
