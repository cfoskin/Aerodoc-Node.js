'use strict';

const Lead = require('../models/Lead');
const Boom = require('boom');

exports.create = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => { res.json({ message: 'Lead created', data: newLead }); })
        .catch(err => { res.send(Boom.badImplementation('error creating Lead')); })
};

exports.getOne = (req, res) => {
    Lead.findOne({ _id: req.params.id })
        .then(lead => {
            if (lead != null) {
                res.send(lead)
            };
        })
        .catch(err => { res.send(Boom.badImplementation('error getting the leads!')); })
};

exports.getAll = (req, res) => {
    Lead.find({}).exec()
        .then(leads => { res.json(leads); })
        .catch(err => { res.send(Boom.badImplementation('error getting the leads!')); })
};

exports.update = (req, res) => {
    Lead.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(lead => {
            if (lead != null) {
                res.json({ message: 'Lead updated!', data: lead });
            }
        })
        .catch(err => { res.send(Boom.badImplementation('error getting that lead!')); })
};
