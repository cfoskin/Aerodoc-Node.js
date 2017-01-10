'use strict';
/* controller for sending dummy push notifications while testing */
////const agSender = require('unifiedpush-node-sender');

/* settings of the push server to use */
const settings = {
    url: "https://demos-pushee.rhcloud.com/ag-push/",
    applicationId: "779b08f9-cbb8-454c-8e8c-e55a7491bd14",
    masterSecret: "2fd5ec35-7a59-480c-b325-a85f6082578a"
};

/* message to send */
const message = {
    alert: 'A new lead has been created',
    sound: 'default',
    badge: 2,
    //simplePush: 'version=123',
    userData: {
        someKey: 'some value',
    }
};

/* message options */
const options = {
    config: {
        ttl: 3600
    },
    // criteria: {
    //     variants: ['506f8218-f584-4860-ad1b-accdbf080f3d'],
    //     categories: ['category1']
    // }
};

exports.sendPush = function() {
    agSender(settings).then((client) => {
        client.sender.send(message, options).then((response) => {
            console.log('success', response);
        })
        .catch(err => {
            console.log('failed to send', err);
        })
    });
}