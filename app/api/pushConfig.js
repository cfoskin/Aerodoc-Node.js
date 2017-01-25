'use strict';

const PushConfig = require('../models/PushConfig');


var updateActiveState = (newPushConfig) => {
    PushConfig.find({ active: true })
        .then(pushConfigs => {
            pushConfigs.forEach((pushConfig) => {
                if (!pushConfig._id.equals(newPushConfig._id)) {
                    pushConfig.active = false;
                    return pushConfig.save()
                        .then(updatedPushConfig => {
                            return res.status(200).json(updatedPushConfig);
                        })
                        .catch(err => {
                            return res.status(500).json({
                                message: 'Error updating active state of push config',
                                error: err
                            });
                        })
                }
            });
        })
        .catch(err => {
            return res.status(404).json({
                message: 'no push configs found',
                error: err
            });
        })
};

exports.create = (req, res) => {
    const pushConfig = new PushConfig(req.body);
    pushConfig.save()
        .then(newPushConfig => {
            if (newPushConfig.active === true) {
                updateActiveState(newPushConfig);
            }
            return res.status(201).json(newPushConfig);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error creating push config',
                error: err
            });
        })
};

exports.getOne = (req, res) => {
    PushConfig.findOne({ _id: req.params.id })
        .then(pushConfig => {
            if (pushConfig != null) {
                return res.status(200).json(pushConfig)
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.getAll = (req, res) => {
    PushConfig.find({}).exec()
        .then(pushConfigs => {
            return res.status(200).json(pushConfigs);
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
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.delete = (req, res) => {
    PushConfig.remove({ _id: req.params.id })
        .then(pushConfig => {
            return res.status(204).json(pushConfig);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        });
};
