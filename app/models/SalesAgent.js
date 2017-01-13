'use strict';

const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

const salesAgentSchema = mongoose.Schema({
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
        required: false
    },
    longitude: {
        type: SchemaTypes.Double,
        required: false
    }
});

const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);
module.exports = SalesAgent;
