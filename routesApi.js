var express = require('express');
//Api
const LeadApi = require('./app/api/lead');
const SalesAgentApi = require('./app/api/salesAgent');
const PushConfigApi = require('./app/api/pushConfig');

module.exports = (function() {
    'use strict';
    var api = express.Router();
    //API routes

    api.get('/leads', LeadApi.getAll);
    api.get('/lead/:id', LeadApi.getOne);
    api.post('/leads', LeadApi.create);
    api.put('/lead/:id', LeadApi.update);
    api.delete('/lead/:id', LeadApi.delete);

    api.get('/salesAgents', SalesAgentApi.getAll);
    api.get('/salesAgent/:id', SalesAgentApi.getOne);
    api.post('/salesAgent', SalesAgentApi.create);
    api.put('/salesAgent/:id', SalesAgentApi.update);

    api.get('/pushConfigs', PushConfigApi.getAll);
    api.get('/pushConfig/:id', PushConfigApi.getOne);
    api.post('/pushConfig', PushConfigApi.create);
    api.put('/pushConfig/:id', PushConfigApi.update);
    api.delete('/pushConfig/:id', PushConfigApi.delete);

    return api;
})();
