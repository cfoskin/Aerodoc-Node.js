'use strict';

const Admin = require('../models/Admin');
const Boom = require('boom')
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const secret = config.secret;
var token;
exports.logIn = (req, res) => {
    res.render('login');
};

exports.authenticate = (req, res) => {
    Admin.findOne({
        username: req.body.username
    }).then(foundAdmin => {
        if (foundAdmin.password != req.body.password) {
            res.status(200).json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
            token = jwt.sign(foundAdmin, secret, {
                expiresIn: 120 
            });
            res.redirect('/leads' + '?token=' + token);
        }
    }).catch(err => {
        res.status(401).json({ success: false, message: 'Authentication failed. Admin user not found.' })
    });
};

exports.logOut = function (request, reply) {
    console.log('It got in!');
    reply.redirect('/');
};

exports.verifyToken = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(400).json({ success: false, message: 'Failed to authenticate token.' });
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
