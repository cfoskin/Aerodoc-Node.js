'use strict';

const PushConfig = require('../models/PushConfig');
const agSender = require('unifiedpush-node-sender');

var getLeadMessage = (lead) => {
    return {
        alert: 'A new lead has been created',
        sound: 'default',
        userData: {
            id: lead.id,
            messageType: 'pushed_lead',
            name: lead.name,
            location: lead.location,
            phone: lead.phoneNumber
        }
    }
}

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
    return agSender(settings)
        .then((client) => {
            return client.sender.send(pushMessage, pushOptions);
        }).then((response) => {
            return response;
        })
};

exports.sendLeads = (aliases, lead) => {
    return PushConfig.findOne({ active: true })
        .then(activePushConfig => {
            if (activePushConfig != null) {
                settings.url = activePushConfig.serverURL;
                settings.applicationId = activePushConfig.pushApplicationId;
                settings.masterSecret = activePushConfig.masterSecret;
                newLeadOptions.criteria.alias = aliases;
                return sendPush(getLeadMessage(lead), newLeadOptions, settings);
            }
        })
};

var getAcceptedLeadMessage = (lead) => {
  return  {
        alert: 'A new lead has been accepted',
        sound: 'default',
        userData: {
            id: lead.id,
            messageType: 'accepted_lead',
            name: lead.name,
            location: lead.location,
            phone: lead.phone
        }
    }
}

var acceptedLeadOptions = {
    config: {
        ttl: 3600
    }
};

exports.sendBroadcast = (lead) => {
  return PushConfig.findOne({ active: true })
        .then(activePushConfig => {
            if (activePushConfig != null) {
                settings.url = activePushConfig.serverURL;
                settings.applicationId = activePushConfig.pushApplicationId;
                settings.masterSecret = activePushConfig.masterSecret;
                return sendPush(getAcceptedLeadMessage(lead), acceptedLeadOptions, settings);
            }
        })
};
