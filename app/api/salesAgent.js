'use strict';

const SalesAgent = require('../models/SalesAgent');

exports.create = (req, res) => {
    const salesAgent = new SalesAgent(req.body);
    salesAgent.save()
        .then(newSalesAgent => { 
           return res.status(201).json(newSalesAgent); })
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
    console.log('hitting put');
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

var createFilterObject = (path, filter) => {
    let filterObject = {};
    let comparator = {};
    let operator = '$eq';
    comparator[operator] = filter;
    filterObject[path] = comparator;
    return filterObject;
};

exports.searchAgents = (req, res) => {
    let filterObject = {};
    let path = '';
    if (req.query.status != '') {
        path = Object.keys(req.query)[0];
        filterObject = createFilterObject(path, req.query.status);
    } else if (req.query.location != '') {
        path = Object.keys(req.query)[1];
        filterObject = createFilterObject(path, req.query.location);
    }

    SalesAgent.find(filterObject || {})
        .exec().then(salesAgents => {
           return res.status(200).json(salesAgents);
        })
        .catch(err => {
            return res.status(404).end('No agents in that location!');
        })
};

exports.searchAgentsInRange = (req, res) => {
     return res.status(200).json('Not yet implemented!');
};

