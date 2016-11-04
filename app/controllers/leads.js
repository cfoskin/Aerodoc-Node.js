'use strict';
const Lead = require('../models/Lead');

exports.getNewLead = (req, res) => {
    res.render('newLead');
};

exports.getOne = (req, res) => {
    Lead.findOne({ _id: req.params.id })
        .then(lead => {
            if (lead != null) {
                res.render('showLead', {
                    lead: lead
                });
            };
        })
        .catch(err => {
            res.json({ success: false, message: 'Id not found.' });
        })
};

exports.createLead = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => {
            res.redirect('/leads');
        })
        .catch(err => {
            res.json({ success: false, message: 'Error creating Lead.' });
        })
};

exports.listAll = (req, res) => {
    Lead.find({}).exec()
        .then(allLeads => {
            res.render('leads', {
                allLeads: allLeads
            });
        })
        .catch(err => {
            res.json({ success: false, message: 'error retrieving the leads from database!' });
        })
};
