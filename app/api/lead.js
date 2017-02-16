'use strict';

const Lead = require('../models/Lead');
const PushSender = require('../utility/pushSender');
const winston = require('winston');
const mdk_express = require('datawire_mdk_express');
const mdk_winston = require('datawire_mdk_winston');
// Route Winston logging to the MDK:
const options = {
    mdk: mdk_express.mdk,
    name: 'lead-service'
}

winston.add(mdk_winston.MDKTransport, options);

exports.create = (req, res) => {
    const lead = new Lead(req.body);
    lead.id = Math.floor((Math.random() * 4732981560546796792) + 1);
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
    winston.info('Received request to get lead' + req.params.id);
    Lead.findOne({ id: req.params.id })
        .then(lead => {
            if (lead != null) {
                return res.status(200).json(lead)
            }
        })
        .catch(err => {
            winston.error('id not found' + req.params.id);
            winston.error(JSON.stringify(err));
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.getAll = (req, res) => {
    winston.info('received request to get all leads');
    Lead.find({}).exec()
        .then(leads => {
            return res.status(200).json(leads);
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
    Lead.findOne({ id: req.params.id })
        .then(lead => {
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
