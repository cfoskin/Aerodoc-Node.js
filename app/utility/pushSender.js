'use strict';

const PushConfig = require('../models/PushConfig');
const agSender = require('unifiedpush-node-sender');

const message = {
    alert: 'A new lead has been created',
    sound: 'default',
    userData: {
        id: 'lead id',
        messageType: 'pushed_lead',
        name: 'lead name',
        location: 'lead location',
        phone: 'lead phone number'
    }
}

var options = {
    criteria: {
        categories: ['lead'],
        alias: []
    },
    config: {
        ttl: 3600,
    }
}

var settings = {
    url: '',
    applicationId: '',
    masterSecret: ''
}

var sendPush = (options, settings) => {
    agSender(settings).then((client) => {
        client.sender.send(message, options).then((response) => {
                return res.status(202).json(response);
            })
            .catch(err => {
                return res.status(500).json({
                message: 'failed to send push',
                error: err
            });
            })
    });
}

exports.buildPushMessage = (aliases) => {
    PushConfig.findOne({ active: true })
        .then(activePushConfig => {
            if (activePushConfig != null) {
                settings.url = activePushConfig.serverURL;
                settings.applicationId = activePushConfig.pushApplicationId;
                settings.masterSecret = activePushConfig.masterSecret;
                options.criteria.alias = aliases;
                sendPush(options, settings);
            }
        })
        .catch(err => {
            return res.status(404).end({
                message: 'error finding active push config',
                error: err
            });
        })
}