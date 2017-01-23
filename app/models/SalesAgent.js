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
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    }
});

const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);
module.exports = SalesAgent;
