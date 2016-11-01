'use strict';

const SalesAgent = require('../models/SalesAgent');
const PushConfig = require('../models/PushConfig');
const Boom = require('boom')
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const secret = config.secret;
const token = '';

exports.logIn = (req, res) => {
    res.render('login');
};

exports.logOut = function (request, reply) {
    reply.render('/');
};

exports.authenticate = (req, res) => {
    console.log(req.body.name);
    SalesAgent.findOne({
        name: req.body.name
    }).then(foundSalesAgent => {
        if (foundSalesAgent.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
             this.token = jwt.sign(foundSalesAgent, secret, {
                expiresIn: 1440 
            });
            //res.redirect('/leads' + '?token=' + this.token);
            res.redirect('/leads');
        }
    }).catch(err => {
        res.json({ success: false, message: 'Authentication failed. Sales Agent not found.' })
    });
};

exports.verifyToken = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
};

exports.pushConfig = (req, res) => {
    PushConfig.find({}).exec()
        .then(allPushConfigs => {
            res.render('pushConfigs', {
                allPushConfigs: allPushConfigs
            });
        })
        .catch(err => {
            res.end('error retrieving the PushConfig from database!');
        })
};



