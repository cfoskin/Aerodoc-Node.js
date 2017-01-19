'use strict';

const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

const salesAgentSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
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
        type: SchemaTypes.Double,
        required: true
    },
    longitude: {
        type: SchemaTypes.Double,
        required: true
    }
});

const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);
module.exports = SalesAgent;
