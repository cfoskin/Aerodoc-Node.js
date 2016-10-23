'use strict';

const Lead = require('../models/Lead');
const Boom = require('boom');

exports.create = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => {
                res.json({ message: 'Lead created', data: newLead });
                //res.render('leads');
        })
        .catch(err => {
             res.send(Boom.badImplementation('error creating Lead'));
        })
};

exports.getOne = (req, res) => {
    Lead.findOne({ _id: req.params.id })
        .then(lead => {
            if (lead != null) {
                return res.send(lead)
            };
        })
        .catch(err => {
             res.send(Boom.notFound('id not found!')); })
};

exports.getAll = (req, res) => {
    Lead.find({}).exec()
        .then(leads => {
            return res.json(leads);})
        .catch(err => {
             res.send(Boom.badImplementation('error retrieving the leads from database!'));
        })
};


 exports.listAll = (req, res) => {
    Lead.find({}).exec()
    .then(allLeads => {
             	 res.render('leads',{
             	 	allLeads: allLeads
             	 });})
    .catch(err => {
             res.send(Boom.badImplementation('error retrieving the leads from database!'));
        })
};

exports.update = (req, res) => {
    Lead.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(lead => {
            if (lead != null) {
                return res.json({ message: 'Lead updated!', data: lead });
            }
        })
        .catch(err => {
             res.send(Boom.notFound('id not found!')); })
};

exports.delete = (req, res) => {
    Lead.remove({ _id: req.params.id })
        .then(lead => {
            return res.json({ message: 'lead deleted', Lead }).code(204);
        })
        .catch(err => {
            return res.end('id not found');
             // return res.end(Boom.notFound('id not found'));
        });
};
