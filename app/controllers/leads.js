'use strict';
const Lead = require('../models/Lead');
const SalesAgent = require('../models/SalesAgent');
var $ = require('jquery');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    apiKey: 'AIzaSyCRHECnpKkbDniey4Z98uodalqx05969ns'
};
var geocoder = NodeGeocoder(options);

exports.getNewLead = (req, res) => {
    res.render('newLead');
};

exports.getOne = (req, res) => {
    Lead.findOne({ _id: req.params.id })
        .then(lead => {
            if (lead != null) {
                var geo = geocoder.geocode(lead.location)
                    .then(function(geoRes) {
                        let longitude = geoRes[0].longitude;
                        let latitude = geoRes[0].latitude;
                        res.render('showLead', {
                            lead: lead,
                            latitude: latitude,
                            longitude: longitude
                        });
                    })
                    .catch(function(err) {
                        console.log(err);
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

var createFilterObject = (path, filter) => {
    let filterObject = {};
    let comparator = {};
    let operator = '$eq';
    comparator[operator] = filter;
    filterObject[path] = comparator;
    return filterObject;
};

exports.searchAgents = (req, res) => {
    Lead.findOne({ _id: req.query.leadId })
        .then(lead => {
            if (lead != null) {
                var geo = geocoder.geocode(lead.location)
                    .then(function(geoRes) {
                        let longitude = geoRes[0].longitude;
                        let latitude = geoRes[0].latitude;
                        let filterObject = {};
                        let path = '';

                        if (req.query.status != '') {
                            path = Object.keys(req.query)[0];
                            filterObject = createFilterObject(path, req.query.status);
                        } else if (req.query.location != '') {
                            path = Object.keys(req.query)[1];
                            filterObject = createFilterObject(path, req.query.location);
                        }
                        SalesAgent.find(filterObject || {})
                            .exec().then(salesAgents => {
                                res.render('showLead', {
                                    lead: lead,
                                    salesAgents: salesAgents,
                                    latitude: latitude,
                                    longitude: longitude
                                });
                            })
                            .catch(err => {
                                return res.status(404).end('No agents in that location!');
                            })
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            res.json({ success: false, message: 'Error' });
        })
};
