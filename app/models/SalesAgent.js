'use strict';

const mongoose = require('mongoose');

const salesAgentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    currentStatus: ['standby', 'pto', 'with_client'],
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const SalesAgent = mongoose.model('SalesAgent', salesAgentSchema);
module.exports = SalesAgent;
