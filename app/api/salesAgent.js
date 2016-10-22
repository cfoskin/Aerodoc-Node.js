'use strict';

const SalesAgent = require('../models/SalesAgent');

exports.create = (req, res) => {
    const salesAgent = new SalesAgent(req.body);
    salesAgent.save()
        .then(newSalesAgent => { res.json({ message: 'sales agent created', data: newSalesAgent }); })
        .catch(err => { res.send(Boom.badImplementation('error creating sales agent')); })
};

exports.getOne = (req, res) => {
    SalesAgent.findOne({ _id: req.params.id })
        .then(salesAgent => {
            if (salesAgent != null) {
                res.send(salesAgent)
            };
        })
        .catch(err => { res.send(Boom.notFound('id not found!')); })
};

exports.getAll = (req, res) => {
    SalesAgent.find({}).exec()
        .then(salesAgents => { res.json(salesAgents); })
        .catch(err => { res.send(Boom.badImplementation('error retrieving the sales agents from database!')); })
};

exports.update = (req, res) => {
    SalesAgent.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(salesAgent => {
            if (salesAgent != null) {
                res.json({ message: 'Sales agent updated!', data: salesAgent });
            }
        })
        .catch(err => { res.send(Boom.notFound('id not found!')); })
};
