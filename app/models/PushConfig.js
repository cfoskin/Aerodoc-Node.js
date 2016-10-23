'use strict';

const mongoose = require('mongoose');

const pushConfigSchema = mongoose.Schema({
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
  	required: true
  }
});

const PushConfig = mongoose.model('PushConfig', pushConfigSchema);
module.exports = PushConfig;
