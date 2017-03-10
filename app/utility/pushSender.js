'use strict';

const PushConfig = require('../models/PushConfig');
const agSender = require('unifiedpush-node-sender');

const newLeadMessage = {
    alert: 'A new lead has been created',
    sound: 'default',
    userData: {
        id: '',
        messageType: 'pushed_lead',
        name: '',
        location: '',
        phone: ''
    }
};

var newLeadOptions = {
    criteria: {
        categories: ['lead'],
             alias: []
    },
    config: {
        ttl: 3600
    }
};

var settings = {
    url: '',
    applicationId: '',
    masterSecret: ''
};

var sendPush = (pushMessage, pushOptions, settings) => {
    agSender(settings)
        .then((client) => {
            client.sender.send(pushMessage, pushOptions).then((response) => {
                    return response;
                });
        })
        .catch(err => {
            return err;
        });
};

exports.sendLeads = (aliases, lead) => {
    PushConfig.findOne({ active: true })
        .then(activePushConfig => {
            if (activePushConfig != null) {
                settings.url = activePushConfig.serverURL;
                settings.applicationId = activePushConfig.pushApplicationId;
                settings.masterSecret = activePushConfig.masterSecret;
                newLeadOptions.criteria.alias = aliases;
                newLeadMessage.userData.id = lead.id;
                newLeadMessage.userData.name = lead.name;
                newLeadMessage.userData.location = lead.location;
                newLeadMessage.userData.phone = lead.phoneNumber;
                sendPush(newLeadMessage, newLeadOptions, settings);
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'error finding active push config',
                error: err
            });
        })
};

const acceptedLeadmessage = {
    alert: 'A new lead has been accepted',
    sound: 'default',
    userData: {
        id: '',
        messageType: 'accepted_lead',
        name: '',
        location: '',
        phone: ''
    }
};

var acceptedLeadOptions = {
    config: {
        ttl: 3600
    }
};

exports.sendBroadcast = (lead) => {
    PushConfig.findOne({ active: true })
        .then(activePushConfig => {
            if (activePushConfig != null) {
                settings.url = activePushConfig.serverURL;
                settings.applicationId = activePushConfig.pushApplicationId;
                settings.masterSecret = activePushConfig.masterSecret;
                acceptedLeadmessage.userData.id = lead.id;
                acceptedLeadmessage.userData.name = lead.name;
                acceptedLeadmessage.userData.location = lead.location;
                acceptedLeadmessage.userData.phone = lead.phoneNumber;
                sendPush(acceptedLeadmessage, acceptedLeadOptions, settings);
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'error finding active push config',
                error: err
            });
        })
};
