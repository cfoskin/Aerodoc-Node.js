'use strict';

const agSender = require('unifiedpush-node-sender');

const settings = {
    url: "https://demos-pushee.rhcloud.com/ag-push/",
    applicationId: "779b08f9-cbb8-454c-8e8c-e55a7491bd14",
    masterSecret: "2fd5ec35-7a59-480c-b325-a85f6082578a"
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
