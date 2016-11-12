'use strict';
/**
controller for sending dummy push notifications while testing.
*/
const agSender = require('unifiedpush-node-sender');
const settings = require('../../config/config.js');

const message = {
    alert: 'send from node aerodoc test',
    sound: 'default',
    badge: 2,
    simplePush: 'version=123',
    userData: {
        someKey: 'some value',
    }
};

const options = {
    config: {
        ttl: 3600,
    },
    criteria: {
    //    variants: ['1234', '56788'],
        categories: ['category1', 'category2']
    }
};

exports.send = function (){
	agSender(settings.agpush).then((client) => {
		console.log(client);
    return client.send(message, options).then((result) => {
        console.log(result);
    }).catch(err => {
            res.json({ success: false, message: 'Failed to send push' });
        })
});
}