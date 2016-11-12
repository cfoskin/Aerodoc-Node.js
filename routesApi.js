var express = require('express');
//Api
const LeadApi = require('./app/api/lead');
const SalesAgentApi = require('./app/api/salesAgent');
const PushConfigApi = require('./app/api/pushConfig');

module.exports = (function() {
    'use strict';
    var api = express.Router();
    //API routes

    api.post('/leads', LeadApi.create);
    api.delete('/leads/:id', LeadApi.delete);
    api.get('/leads/:id', LeadApi.getOne);
    api.get('/leads', LeadApi.getAll);
    api.put('/leads/:id', LeadApi.update);
    //new
    api.post('/leads/sendleads/:id', LeadApi.sendLeads);

    api.post('/salesAgents', SalesAgentApi.create);
    api.delete('/salesAgents/:id', SalesAgentApi.delete);
    api.get('/salesAgents/:id', SalesAgentApi.getOne);
    api.get('/salesAgents', SalesAgentApi.getAll);
    api.put('/salesAgents/:id', SalesAgentApi.update);
    //new routes 
    api.get('/salesAgents/searchagents', SalesAgentApi.searchAgents);
    api.get('/salesAgents/searchagentsinrange', SalesAgentApi.searchAgentsInRange);


    api.post('/pushConfig', PushConfigApi.create);
    api.delete('/pushConfig/:id', PushConfigApi.delete);
    api.get('/pushConfig/:id', PushConfigApi.getOne);
    api.get('/pushConfig', PushConfigApi.getAll);
    api.put('/pushConfig/:id', PushConfigApi.update);

    return api;
})();
