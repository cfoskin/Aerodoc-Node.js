'use strict';

const Lead = require('../models/Lead');

exports.create = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => {
            return res.status(201).json(lead);
        })
        .catch(err => {
            return res.status(500).end('Error creating Lead');
        })
};

exports.getOne = (req, res) => {
    Lead.findOne({ _id: req.params.id })
        .then(lead => {
            if (lead != null) {
                return res.status(200).json(lead)
            }
        })
        .catch(err => {
            return res.status(404).end('id not found');
        })
};

exports.getAll = (req, res) => {
    Lead.find({}).exec()
        .then(leads => {
            return res.status(200).json(leads);
        })
        .catch(err => {
            return res.status(404).end('id not found');
        })
};

exports.deleteAll = (req, res) => {
    Lead.remove({})
        .then(err => {
            return res.status(204);
        })
        .catch(err => {
            return res.status(404).end('Error retrieving the leads from database!');
        })
};

exports.update = (req, res) => {
    Lead.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(lead => {
            if (lead != null) {
                return res.status(200).json(lead);
            }
        })
        .catch(err => {
            return res.status(404).end('id not found');
        })
};

exports.delete = (req, res) => {
    Lead.remove({ _id: req.params.id })
        .then(lead => {
            return res.status(204).json(lead);
        })
        .catch(err => {
            return res.status(404).end('id not found');
        });
};

exports.sendLeads = () => {
   //send lead to a list of agents
};

exports.sendBroadcast = () => {
   //send broadcast to all agents
};

var getActivePushConfig = () => {
   //get the current active push config
};


