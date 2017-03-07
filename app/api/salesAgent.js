'use strict';

const SalesAgent = require('../models/SalesAgent');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder();

exports.create = (req, res) => {
    const salesAgent = new SalesAgent(req.body);
    let coordinates = [[], []];
    //setting the cordinates on the 2d array for geospatial query
    coordinates[0] = salesAgent.latitude;
    coordinates[1] = salesAgent.longitude;
    //get the city using the lat - long pairs
    geocoder.reverse({ lat: coordinates[0], lon: coordinates[1] })
        .then( place => {
            //update the sales agents location to the city returned
            salesAgent.location = place[0].city;
            salesAgent.coordinates = coordinates;
            salesAgent.id = Date.now().toString();
            return salesAgent.save()
                .then(newSalesAgent => {
                    return res.status(201).json(newSalesAgent);
                })
                .catch(err => {
                    return res.status(500).json({
                        message: 'Error creating sales agent',
                        error: err
                    });
                });
        })
        .catch(err => {
            return res.status(404).json({
                message: 'Error - no location found for lat/long pair - sales agent not created',
                error: err
            });
        });
};

exports.getOne = (req, res) => {
    SalesAgent.findOne({ id: req.params.id })
        .then(salesAgent => {
            if (salesAgent != null) {
                return res.status(200).json(salesAgent)
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            })
        })
};

exports.getAll = (req, res) => {
    SalesAgent.find({}).exec()
        .then(salesAgents => {
            return res.status(200).json(salesAgents);
        })
};

exports.update = (req, res) => {
    SalesAgent.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(salesAgent => {
            if (salesAgent != null) {
                return res.status(200).json(salesAgent);
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        })
};

exports.delete = (req, res) => {
    SalesAgent.remove({ id: req.params.id })
        .then(salesAgent => {
            return res.status(204).json(salesAgent);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        });
};

var createFilterObject = (path, filter) => {
    const filterObject = {};
    const comparator = {};
    const operator = '$eq';
    comparator[operator] = filter;
    filterObject[path] = comparator;
    return filterObject;
};

exports.searchAgents = (req, res) => {
    let filterObject = {};
    let path;
    if (req.query.status != '') {
        path = Object.keys(req.query)[0];
        filterObject = createFilterObject(path, req.query.status);
    } else if (req.query.location != '') {
        path = Object.keys(req.query)[1];
        filterObject = createFilterObject(path, req.query.location);
    }

    SalesAgent.find(filterObject || {})
        .exec().then(salesAgents => {
            return res.status(200).json(salesAgents);
        })
        .catch(err => {
            return res.status(404).end({
                message: 'No agents found!',
                error: err
            });
        })
};

exports.searchAgentsInRange = (req, res) => {
    var limit = req.query.limit || 10;
    var radius = req.query.radius;
    radius /= 111.12;
    var coords = [];
    coords[0] = req.query.latitude;
    coords[1] = req.query.longitude;
    console.log(coords);
    // find an agent in the radius of the circle on the map
    SalesAgent.find({
        coordinates: {
            $near: coords,
            $maxDistance: radius
        }
    }).limit(limit).exec(function(err, salesAgents) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(salesAgents);
    });

};
