'use strict';

const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },

  location: {
  	type: String,
  	required: true
  },
  phNo: {
  	type: String,
  	required: true
  },
  salesAgent: {
  	type: String,
  	required: false
  }
});

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;
