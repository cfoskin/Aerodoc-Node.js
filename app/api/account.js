'use strict';
const SalesAgent = require('../models/SalesAgent');

exports.login = (req, res) => {
    const salesAgent = req.body;
    SalesAgent.findOne({ name: salesAgent.loginName })
        .then(foundSalesAgent => {
            if (foundSalesAgent) {
                if (foundSalesAgent.password === salesAgent.password) {
                    return res.status(200).json(foundSalesAgent)
                } else {
                    return res.status(401).end('unauthorised');
                }
            } else {
                return res.status(404).end('user not found');
            }
        }).catch(err => {
            return res.status(404).end('user not found');
        })
};
