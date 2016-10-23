'use strict';

const Admin = require('../models/Admin');
const Boom = require('boom');

exports.create = (req, res) => {
    const admin = new Admin(req.body);
    admin.save()
        .then(newAdmin => {
            return res.json({ message: 'Admin created', data: newAdmin }); })
        .catch(err => { res.send(Boom.badImplementation('error creating admin')); })
};

exports.get = (req, res) => {
    Admin.findOne({ _id: req.params.id })
        .then(admin => {
            if (admin != null) {
                return res.send(admin)
            };
        })
        .catch(err => { res.send(Boom.notFound('id not found!')); })
};
