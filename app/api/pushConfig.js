'use strict';

const PushConfig = require('../models/PushConfig');
const Boom = require('boom');

exports.create = (req, res) => {
    const pushConfig = new PushConfig(req.body);
    pushConfig.save()
        .then(newPushConfig => {
            return res.json({ message: 'push confuration created', data: newPushConfig }); })
        .catch(err => { res.send(Boom.badImplementation('error creating push confuration')); })
};

exports.getOne = (req, res) => {
    PushConfig.findOne({ _id: req.params.id })
        .then(pushConfig => {
            if (pushConfig != null) {
                return res.send(pushConfig)
            };
        })
        .catch(err => { res.send(Boom.notFound('id not found!')); })
};

exports.getAll = (req, res) => {
    PushConfig.find({}).exec()
        .then(pushConfig => {
            return res.json(pushConfig); })
        .catch(err => { res.send(Boom.badImplementation('error retrieving the push configurations from database!')); })
};

exports.update = (req, res) => {
    PushConfig.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(pushConfig => {
            if (pushConfig != null) {
                res.json({ message: 'Push Config updated!', data: pushConfig });
            }
        })
        .catch(err => { res.send(Boom.notFound('id not found!')); })
};

exports.delete = (req, res) => {
    PushConfig.remove({ _id: req.params.id })
        .then(pushConfig => {
            return res.json({ message: 'push confuration deleted', PushConfig }).code(204);
        })
        .catch(err => {
            return res.send(Boom.notFound('id not found'));
        });
};
