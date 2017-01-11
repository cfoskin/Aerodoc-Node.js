const express = require('express');
//Api
const LeadApi = require('./app/api/lead');
const SalesAgentApi = require('./app/api/salesAgent');
const PushConfigApi = require('./app/api/pushConfig');
const AccountApi = require('./app/api/account');

module.exports = (function() {
    'use strict';
    const api = express.Router();
    //API routes

    api.post('/login', AccountApi.login);

    api.post('/leads', LeadApi.create);
    api.delete('/leads/:id', LeadApi.delete);
    api.get('/leads/:id', LeadApi.getOne);
    api.get('/leads', LeadApi.getAll);
    api.put('/leads/:id', LeadApi.update);
    //new
    api.post('/leads/sendleads/:id', LeadApi.sendLeads);

    api.post('/salesagents', SalesAgentApi.create);
    api.delete('/salesagents/:id', SalesAgentApi.delete);
    api.get('/salesagents/:id', SalesAgentApi.getOne);
    api.get('/salesagents', SalesAgentApi.getAll);
    api.put('/salesagents/:id', SalesAgentApi.update);
    //new routes 
    api.get('/salesagents/searchagents', SalesAgentApi.searchAgents);
    api.get('/salesagents/searchagentsinrange', SalesAgentApi.searchAgentsInRange);


    api.post('/pushConfig', PushConfigApi.create);
    api.delete('/pushConfig/:id', PushConfigApi.delete);
    api.get('/pushConfig/:id', PushConfigApi.getOne);
    api.get('/pushConfig', PushConfigApi.getAll);
    api.put('/pushConfig/:id', PushConfigApi.update);

    return api;
})();
