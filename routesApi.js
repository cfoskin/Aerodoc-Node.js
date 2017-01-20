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
    api.post('/logout', AccountApi.logout);

    //Leads
    api.post('/leads', LeadApi.create);
    api.delete('/leads/:id', LeadApi.delete);
    api.get('/leads/:id', LeadApi.getOne);
    api.get('/leads', LeadApi.getAll);
    api.put('/leads/:id', LeadApi.update);
    api.post('/leads/sendleads/:id', LeadApi.sendLeads);
    //Sales Agents
    api.post('/saleagents', SalesAgentApi.create);
    api.delete('/saleagents/:id', SalesAgentApi.delete);
    api.get('/salesagents/:id', SalesAgentApi.getOne); //different route to original
    api.get('/saleagents', SalesAgentApi.getAll);
    api.put('/saleagents/:id', SalesAgentApi.update);
    api.get('/saleagents/searchAgents', SalesAgentApi.searchAgents);
    api.get('/saleagents/searchagentsinrange', SalesAgentApi.searchAgentsInRange);
    //Push Config
    api.post('/pushConfig', PushConfigApi.create);
    api.delete('/pushConfig/:id', PushConfigApi.delete);
    api.get('/pushConfig/:id', PushConfigApi.getOne);
    api.get('/pushConfig', PushConfigApi.getAll);
    api.put('/pushConfig/:id', PushConfigApi.update);

    return api;
})();
