'use strict';

const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config/config');

//Api
const LeadApi = require('./app/api/lead');
const SalesAgentApi = require('./app/api/salesAgent');
const PushConfigApi = require('./app/api/pushConfig');
const AdminApi = require('./app/api/admin');

//controllers
const Account = require('./app/controllers/account');
const Lead = require('./app/controllers/leads');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'));

mongoose.connect(config.database, (err, database) => {
    if (err) return console.log(err, 'Error connecting to database')
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

//App routes
routes.get('/', Account.logIn);
routes.post('/logIn', Account.authenticate);
//protect routes from here
routes.use(Account.verifyToken);
routes.get('/leads', Lead.getAll);
routes.post('/lead', Lead.createLead);
app.use('/', routes);

//API routes
app.post('/api/admin', AdminApi.create);
app.get('/api/admin/:id', AdminApi.get);
app.get('/api/admins', AdminApi.getAll);
app.delete('/api/admin/:id', AdminApi.delete);

app.get('/api/leads', LeadApi.getAll);
app.get('/api/lead/:id', LeadApi.getOne);
app.post('/api/lead', LeadApi.create);
app.put('/api/lead/:id', LeadApi.update);
app.delete('/api/lead/:id', LeadApi.delete);

app.get('/api/salesAgents', SalesAgentApi.getAll);
app.get('/api/salesAgent/:id', SalesAgentApi.getOne);
app.post('/api/salesAgent', SalesAgentApi.create);
app.put('/api/salesAgent/:id', SalesAgentApi.update);

app.get('/api/pushConfigs', PushConfigApi.getAll);
app.get('/api/pushConfig/:id', PushConfigApi.getOne);
app.post('/api/pushConfig', PushConfigApi.create);
app.put('/api/pushConfig/:id', PushConfigApi.update);
app.delete('/api/pushConfig/:id', PushConfigApi.delete);
