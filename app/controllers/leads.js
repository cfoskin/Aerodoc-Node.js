'use strict';
const Lead = require('../models/Lead');

exports.getNewLead = (req, res) => {
    res.render('newLead');
};

exports.getOne = (req, res) => {
    Lead.findOne({ _id: req.params.id })
        .then(lead => {
            if (lead != null) {
                 res.render('showLead', {
                lead: lead
            });
            };
        })
        .catch(err => {
             res.send(Boom.notFound('id not found!')); })

        function ShowLeadController($scope, $routeParams, $location, $filter,
        dataService) {
    var map = new AeroGear.Map();

    var self = this;
    $scope.disabled = false;
    var leadPipe = dataService.leadPipe;
    var saleAgentPipe = dataService.saleAgentPipe;
    var searchAgents = dataService.searchAgents;
    var sendLeads = AeroGear.Pipeline({
        name : "sendleads",
        settings : {
        }
    }).pipes.sendleads;

    function searchAgentsInRange(location, radius) {
        var searchAgents = AeroGear.Pipeline({
            name: "searchAgents",
            settings: {
                endpoint: "rest/saleagents/searchAgentsInRange/"
            }
        }).pipes.searchAgents;

        searchAgents.read({
            query: {
                latitude: location.lat,
                longitude: location.lon,
                radius: radius / 1000
            },
            success: function (data) {
            }
        });
    }
}
};

exports.createLead = (req, res) => {
    const lead = new Lead(req.body);
    lead.save()
        .then(newLead => {
            res.redirect('/leads');
        })
        .catch(err => {
            res.json({ success: false, message: 'Error creating Lead.' });
        })
};

exports.listAll = (req, res) => {
    Lead.find({}).exec()
        .then(allLeads => {
            res.render('leads', {
                allLeads: allLeads
            });
        })
        .catch(err => {
            res.end('error retrieving the leads from database!');
        })
};


