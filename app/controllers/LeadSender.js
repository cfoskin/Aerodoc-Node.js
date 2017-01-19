'use strict';

const agSender = require('unifiedpush-node-sender');

const settings = {
    url: "",
    applicationId: "",
    masterSecret: ""
}

const message = {
    alert: 'A new lead has been created',
    sound: 'default',
    //actionCategory: 'acceptLead',
    userData: {
        id: 'lead id',
        messageType: 'pushed_lead',
        name: 'lead name',
        location: 'lead location',
        phone: 'lead phone number'
    }
}
const options = {
    criteria: {
    categories: ['lead'],     
    alias: []
    },
    config: {
        ttl: 3600,
    }
}

exports.sendLeads = (aliases) => {
    options.criteria.alias = aliases;
    agSender(settings).then((client) => {
        client.sender.send(message, options).then((response) => {
            return res.status(202).json(response);
            })
            .catch(err => {
                return res.status(500).end('failed to send', err);
            })
    });
}

exports.sendBroadcast = () => {}

var getActivePushConfig = () => {

}
