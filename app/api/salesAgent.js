'use strict';

const SalesAgent = require('../models/SalesAgent');
const Boom = require('boom');

exports.create = (req, res) => {
    const salesAgent = new SalesAgent(req.body);
    salesAgent.save()
        .then(newSalesAgent => { 
           return res.status(201).json(salesAgent); })
        .catch(err => {  
            return res.status(500).end('Error creating sales agent');
             })
};

exports.getOne = (req, res) => {
    SalesAgent.findOne({ _id: req.params.id })
        .then(salesAgent => {
            if (salesAgent != null) {
                return res.status(200).json(salesAgent)
            };
        })
        .catch(err => {  
            return res.status(404).end('id not found');
        })
};

exports.getAll = (req, res) => {
    SalesAgent.find({}).exec()
        .then(salesAgents => { 
            return res.status(200).json(salesAgents);
             })
        .catch(err => {  
            return res.status(404).end('error retrieving the sales agents from database!'); 
        })
};

exports.update = (req, res) => {
    SalesAgent.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(salesAgent => {
            if (salesAgent != null) {
                return res.status(200).json(salesAgent);
            }
        })
        .catch(err => { 
            return res.status(404).end('id not found');
             })
};

exports.delete = (req, res) => {
    SalesAgent.remove({ _id: req.params.id })
        .then(salesAgent => {
            return res.status(204).json(salesAgent);
        })
        .catch(err => {
            return res.status(404).end('id not found');
        });
};

exports.searchAgents = () => {
};

exports.searchAgentsInRange = () => {
};

