'use strict';

const PushConfig = require('../models/PushConfig');

exports.getPushConfig = (req, res) => {
    res.render('newPushConfig');
};

exports.getOne = (req, res) => {
    PushConfig.findOne({ _id: req.params.id })
        .then(pushConfig => {
            if (pushConfig != null) {
                res.render('editPushConfig', {
                    pushConfig: pushConfig
                });
            };
        })
        .catch(err => {
            res.json({ success: false, message: 'Id not found.' });
        })
};

exports.createPushConfig = (req, res) => {
    const pushConfig = new PushConfig(req.body);
    pushConfig.save()
        .then(newPushConfig => {
            res.redirect('/pushConfigs');
        })
        .catch(err => {
            res.json({ success: false, message: 'Error creating Push config.' });
        })
};

exports.update = (req, res) => {
    PushConfig.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(pushConfig => {
            if (pushConfig != null) {
                res.render('pushConfigs');
            };
        })
        .catch(err => {
            res.json({ success: false, message: 'Id not found.' });
        })
};

exports.findActiveConfig = () => {
    //finds the only active config on the system
};

