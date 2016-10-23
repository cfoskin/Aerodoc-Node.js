'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Lead = require('./app/api/lead');
const SalesAgent = require('./app/api/salesAgent');
const PushConfig = require('./app/api/pushConfig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:/aerodoc', (err, database) => {
    if (err) return console.log(err, 'Error connecting to database')
    app.listen(3000, () => {
        console.log('Server started on 3000')
    })
})

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: "views/layouts/",
    partialsDir: 'views/partials'
});

app.engine('handlebars', hbs.engine);
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('home', { layout: false });
})

app.get('/leads', Lead.listAll);
app.get('/leads', Lead.getAll);
app.get('/lead/:id', Lead.getOne);
app.post('/lead', Lead.create);
app.put('/lead/:id', Lead.update);
app.delete('/lead/:id', Lead.delete);

app.get('/salesAgents', SalesAgent.getAll);
app.get('/salesAgent/:id', SalesAgent.getOne);
app.post('/salesAgent', SalesAgent.create);
app.put('/salesAgent/:id', SalesAgent.update);

app.get('/pushConfigs', PushConfig.getAll);
app.get('/pushConfig/:id', PushConfig.getOne);
app.post('/pushConfig', PushConfig.create);
app.put('/pushConfig/:id', PushConfig.update);
app.delete('/pushConfig/:id', PushConfig.delete);

