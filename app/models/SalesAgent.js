'use strict';

const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;

const salesAgentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        currentStatus: ['standby', 'pto', 'with_client'],
        required: false
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
