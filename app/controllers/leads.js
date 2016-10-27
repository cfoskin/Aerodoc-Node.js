'use strict';
const Lead = require('../models/Lead');

exports.getNewLead = (req, res) => {
    res.render('newLead');
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

exports.getAll = (req, res) => {
    Lead.find({}).exec()
        .then(allLeads => {
            res.render('leads', {
                allLeads: allLeads
            });
        })
        .catch(err => {
            res.end('error retrieving the leads from database!');
        })
};
