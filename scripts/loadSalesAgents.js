'use strict';

const config = require('../config/config');
const db = require('mongoose').connect(config.database).connection;
const salesAgents = require('../resources/fixtures').salesAgents;
const SalesAgent = require('../app/models/SalesAgent');

db.on('error', console.error.bind(console, 'Error connecting to Mongo Database:'));

db.collections['salesagents'].drop((err) => {
            console.log('removing old sales agents');
        });

db.once('open', function() {
    console.log('Connected to Mongo Database');
    salesAgents.forEach((salesAgent) => {
    	   salesAgent.id = Math.floor((Math.random() * 4732981560546796792) + 1).toString();
    });
    SalesAgent.collection.insert(salesAgents, () => {
        console.log('Users added to Database');
    }); 
    db.close();
});
