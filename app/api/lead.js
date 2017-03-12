'use strict';

const Lead = require('../models/Lead');
const PushSender = require('../utility/pushSender');

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
    Lead.findOne({ id: req.params.id })
        .then(lead => {
            if (lead != null) {
                return res.status(200).json(lead)
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.getAll = (req, res) => {
    Lead.find({ saleAgent: null }).exec()
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
                let newAliases = [];
                let newAlias = {};
                //modify the aliases to suit the message to fix push: AGPUSH-2065
                aliases.forEach((alias) => {
                    newAlias.id = alias.id;
                    newAlias.loginName = alias.loginName;
                    newAlias.password =  alias.password;
                    newAlias.location = alias.location;
                    newAlias.status = alias.status;
                    newAlias.latitude = alias.latitude;
                    newAlias.longitude = alias.longitude;
                    newAliases.push(newAlias);
                });

               return {
                lead: lead,
                newAliases: newAliases
            };
            }
        }).then( data => {
            return PushSender.sendLeads(data.newAliases, data.lead);
        }).then( () => {
                return res.status(200).json('leads sent');
        })
        .catch(err => {
            return res.status(404).json({
                error: err.message
            });
        })
};

exports.sendBroadcast = (req, res) => {
    Lead.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(lead => {
            if (lead != null) {
               return PushSender.sendBroadcast(lead);
            }
        }).then( () => {
            console.log('success');
                return res.status(204).json('success');
        })
        .catch(err => {
           return res.status(404).json({
                error: err.message
            });
        })
};
