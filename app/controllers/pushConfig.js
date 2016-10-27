'use strict';

const PushConfig = require('../models/PushConfig');

exports.getPushConfig = (req, res) => {
    res.render('newPushConfig');
};

exports.createPushConfig = (req, res) => {
    const pushConfig = new PushConfig(req.body);
    pushConfig.save()
        .then(newPushConfig => {
            res.redirect('/pushConfig');
        })
        .catch(err => { res.json({ success: false, message: 'Error creating Push config.' });
         })
};
