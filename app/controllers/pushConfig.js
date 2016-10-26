'use strict';

const PushConfig = require('../models/PushConfig');

exports.viewNewPushConfig = (req, res) => {
    res.render('newPushConfig');
};
