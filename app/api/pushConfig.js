'use strict';

const PushConfig = require('../models/PushConfig');

exports.create = (req, res) => {
    const pushConfig = new PushConfig(req.body);
    pushConfig.save()
        .then(newPushConfig => {
             return res.status(201).json(pushConfig);       })
        .catch(err => {
            return res.status(500).end('Error creating push config');
          })
};

exports.getOne = (req, res) => {
    PushConfig.findOne({ _id: req.params.id })
        .then(pushConfig => {
            if (pushConfig != null) {
                return res.status(200).json(pushConfig)
            };
        })
        .catch(err => { 
            return res.status(404).end('id not found');
        })
};

exports.getAll = (req, res) => {
    PushConfig.find({}).exec()
        .then(pushConfigs => {
            return res.status(200).json(pushConfigs); })
        .catch(err => { 
            return res.status(404).end('Error retrieving push configs');
        })
};

exports.update = (req, res) => {
    PushConfig.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(pushConfig => {
            if (pushConfig != null) {
                return res.status(200).json(pushConfig);
            }
        })
        .catch(err => { 
            return res.status(404).end('id not found');
             })
};

exports.delete = (req, res) => {
    PushConfig.remove({ _id: req.params.id })
        .then(pushConfig => {
            return res.status(204).json(PushConfig);
        })
        .catch(err => {
            return res.status(404).end('id not found');
        });
};
