'use strict';

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  username: {
  	type: String,
    unique: true,
  	required: true
  },

  password: {
  	type: String,
  	required: true
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
