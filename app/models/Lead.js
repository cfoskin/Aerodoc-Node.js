'use strict';

const mongoose = require('mongoose');
const leadSchema = mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    saleAgent: {
        type: String,
        required: false
    }
});

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;
