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
const Admin = require('./app/api/admin');

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
});

app.get('/api/leads', Lead.listAll);
app.get('/api/leads', Lead.getAll);
app.get('/api/lead/:id', Lead.getOne);
app.post('/api/lead', Lead.create);
app.put('/api/lead/:id', Lead.update);
app.delete('/api/lead/:id', Lead.delete);

app.get('/api/salesAgents', SalesAgent.getAll);
app.get('/api/salesAgent/:id', SalesAgent.getOne);
app.post('/api/salesAgent', SalesAgent.create);
app.put('/api/salesAgent/:id', SalesAgent.update);

app.get('/api/pushConfigs', PushConfig.getAll);
app.get('/api/pushConfig/:id', PushConfig.getOne);
app.post('/api/pushConfig', PushConfig.create);
app.put('/api/pushConfig/:id', PushConfig.update);
app.delete('/api/pushConfig/:id', PushConfig.delete);

