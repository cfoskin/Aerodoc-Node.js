'use strict';
const Admin = require('../models/Admin');

exports.main = (req, res) => {
    res.render('login');
  };

exports.logIn = (req, res) => {
      const admin = req.body;
      Admin.findOne({ username: admin.username})
      .then(foundAdmin => {
          if (foundAdmin && foundAdmin.password === admin.password) {
              res.redirect('/leads');
          } else {
              reply.redirect('/account');
          }}).catch(err => { 
        res.redirect('/'); })
  };
