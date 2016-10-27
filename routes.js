var express = require('express');
//controllers
const Account = require('./app/controllers/account');
const Lead = require('./app/controllers/leads');
const PushConfig = require('./app/controllers/pushConfig');

module.exports = (function() {
    'use strict';
    var router = express.Router();

    router.post('/logIn', Account.authenticate);
//App routes
router.get('/', Account.logIn);
router.get('/pushConfig', Account.pushConfig);
router.get('/newpushConfig', PushConfig.getPushConfig);
router.post('/newPushConfig', PushConfig.createPushConfig);
router.get('/newLead', Lead.getNewLead);
//protect routes from here
//auth off while doing dev
//routes.use(Account.verifyToken);
router.get('/leads', Lead.listAll);
router.post('/newLead', Lead.createLead);
    return router;    
})();
