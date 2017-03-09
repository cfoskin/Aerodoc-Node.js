'use strict';

const mongoose = require('mongoose');

const salesAgentSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: false
    },
    loginName: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['STANDBY', 'PTO', 'WITH_CLIENT'],
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    coordinates: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});


const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);
module.exports = SalesAgent;
