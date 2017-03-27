'use strict';

const mongoose = require('mongoose');

const pushConfigSchema = mongoose.Schema({
  id: {
        type: String,
        unique: true,
        required: false
    },
  pushApplicationId: {
  	type: String,
  	required: true
  },
  masterSecret: {
  	type: String,
  	required: true
  },
  serverURL: {
  	type: String,
  	required: true
  },
  active: {
  	type: Boolean,
  	required: true,
    default: false
  }
});

const PushConfig = mongoose.model('PushConfig', pushConfigSchema);
module.exports = PushConfig;
