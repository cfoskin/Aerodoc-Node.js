'use strict';
const Lead = require('../models/Lead');


exports.createLead = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => {
            res.redirect('/leads');
        })
        .catch(err => {
             res.end('error creating Lead');
        })
};

 exports.getAll = (req, res) => {
    Lead.find({}).exec()
    .then(allLeads => {
             	 res.render('leads',{
             	 	allLeads: allLeads
             	 });})
    .catch(err => {
             res.end('error retrieving the leads from database!');
        })
};