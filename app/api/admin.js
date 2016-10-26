'use strict';

const Admin = require('../models/Admin');
const Boom = require('boom');

exports.create = (req, res) => {
    const admin = new Admin(req.body);
    admin.save()
        .then(newAdmin => {
             return res.json({ message: 'Admin created', data: newAdmin }); })
        .catch(err => { res.json('error creating admin'); })
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

exports.getAll = (req, res) => {
    Admin.find({}).exec()
        .then(admins => {
            return res.json(admins);})
        .catch(err => {
             res.send(Boom.badImplementation('error retrieving the admins from database!'));
        })
};

exports.delete = (req, res) => {
    Admin.remove({ _id: req.params.id })
        .then(admin => {
            return res.json({ message: 'admin deleted', Lead }).code(204);
        })
        .catch(err => {
            return res.end('id not found');
             // return res.end(Boom.notFound('id not found'));
        });
};
