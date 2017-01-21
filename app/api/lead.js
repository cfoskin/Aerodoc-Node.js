'use strict';

const Lead = require('../models/Lead');
const PushSender = require('../utility/pushSender');

exports.create = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => {
            return res.status(201).json(newLead);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'error creating Lead',
                error: err
            });
        })
};

exports.getOne = (req, res) => {
    Lead.findOne({ id: req.params.id })
        .then(lead => {
            if (lead != null) {
                return res.status(200).json(lead)
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "'id not found'",
                error: err
            });
        })
};

exports.getAll = (req, res) => {
    Lead.find({}).exec()
        .then(leads => {
            return res.status(200).json(leads);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.delete = (req, res) => {
    Lead.remove({ id: req.params.id })
        .then(lead => {
            return res.status(204).json(lead);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        });
};

exports.sendLeads = (req, res) => {
    console.log(req.params.id);
    Lead.findOne({ id: req.params.id })
        .then(lead => {
            console.log(lead);
            if (lead != null) {
                const aliases = req.body;
                PushSender.sendLeads(aliases, lead);
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.sendBroadcast = (req, res) => {
    Lead.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(lead => {
            if (lead != null) {
                PushSender.sendBroadcast(lead);
                return res.status(200).json(lead);
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};










