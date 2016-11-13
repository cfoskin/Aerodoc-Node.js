'use strict';

const SalesAgent = require('../models/SalesAgent');
const PushConfig = require('../models/PushConfig');
const config = require('../../config/config');
const secret = config.secret;
const token = '';

exports.logIn = (req, res) => {
    res.render('login');
};

exports.logOut = function(request, reply) {
    reply.render('/');
};

exports.authenticate = (req, res) => {
    const salesAgent = req.body;
    SalesAgent.findOne({ name: salesAgent.name })
        .then(foundSalesAgent => {
            if (foundSalesAgent && foundSalesAgent.password === foundSalesAgent.password) {
                res.redirect('/leads');
            } else {
                reply.redirect('/');
            }
        }).catch(err => {
            res.redirect('/');
        })
};

exports.pushConfig = (req, res) => {
    PushConfig.find({}).exec()
        .then(allPushConfigs => {
            res.render('pushConfigs', {
                allPushConfigs: allPushConfigs
            });
        })
        .catch(err => {
            res.json({ success: false, message: 'Id not found.' });
        })
};
