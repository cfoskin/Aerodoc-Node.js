'use strict';
/* controller for sending dummy push notifications while testing */
//const agSender = require('unifiedpush-node-sender');

/* settings of the push server to use */
const settings = {
    url: 'https://aerogear-pushee.rhcloud.com/ag-push',
    applicationId: '502b2590-5ba3-471c-a7a2-dc9dfd48861a',
    masterSecret: '81f88207-a9c8-458c-a217-e46bc03e5e69'
};

/* message to send */
const message = {
    alert: 'send from node aerodoc test',
    sound: 'default',
    badge: 2,
    simplePush: 'version=123',
    userData: {
        someKey: 'some value',
    }
};

/* message options */
const options = {
    config: {
        ttl: 3600,
    },
    criteria: {
        variants: ['ee1a8fb2-c4af-4e40-a3af-a711632f72e1'],
        categories: ['category1']
    }
};

exports.sendPush = function() {
    agSender(settings).then((client) => {
        client.sender.send(message, options).then((response) => {
            console.log('success', response);
        })
    });
}
