'use strict';

const PushConfig = require('../models/PushConfig');


var updateActiveState = (newPushConfig) => {
    PushConfig.find({ active: true })
        .then(pushConfigs => {
            pushConfigs.forEach((pushConfig) => {
                if (!pushConfig._id.equals(newPushConfig._id)) {
                    pushConfig.active = false;
                    return pushConfig.save()
                        .then(updatedPushConfig => {
                            return updatedPushConfig;
                        })
                        .catch(err => {
                            return err
                        })
                }
            });
        })
        .catch(err => {
            return err;
        })
};


exports.create = function (req, res) {
    const data = new PushConfig(req.body);
    data.id = Date.now().toString();
    data.save(function(err, newPushConfig) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (newPushConfig.active === true) {
               PushConfig.find({ active: true }, function(err, truePushConfigs) {
                 if (err) {
                    return res.status(404).json({
                        error: err.message
                    });
                }

                truePushConfigs.forEach(function(pushConfig) {
                if (!pushConfig._id.equals(newPushConfig._id)) {
                    pushConfig.active = false;
                    pushConfig.save(function(err, updatedPushConfig) {
                         if (err) {
                            return res.status(500).json({
                                error: err.message
                            });
                        }
                        return updatedPushConfig;
                    });
                }
              });
            })  
          }
          return res.status(201).json(newPushConfig);
    })
};


// exports.create = (req, res) => {
//     const pushConfig = new PushConfig(req.body);
//     pushConfig.id = Date.now().toString();
//     pushConfig.save()
//         .then(newPushConfig => {
//             if (newPushConfig.active === true) {
//                 updateActiveState(newPushConfig);
//             }
//             return res.status(201).json(newPushConfig);
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 message: 'Error creating push config',
//                 error: err
//             });
//         })
// };

exports.getOne = (req, res) => {
    PushConfig.findOne({ id: req.params.id })
        .then(pushConfig => {
            if (pushConfig !== null) {
                return res.status(200).json(pushConfig)
            }
            else{
                return res.status(404).json({message: 'no push config'});
            }
        })
        .catch(err => {
            return res.status(404).json({
                error: err
            });
        })
};

exports.getAll = (req, res) => {
    PushConfig.find({}).exec()
        .then(pushConfigs => {
            return res.status(200).json(pushConfigs);
        })
};

exports.update = (req, res) => {
    PushConfig.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(pushConfig => {
            if (pushConfig !== null) {
                if (pushConfig.active === true) {
                updateActiveState(pushConfig);
            }
                return res.status(200).json(pushConfig);
            }
            else{
                return res.status(404).json({message: 'no push config'});
            }
        })
        .catch(err => {
            return res.status(404).json({
                error: err
            });
        })
};

exports.delete = (req, res) => {
    PushConfig.remove({ id: req.params.id })
        .then(pushConfig => {
            return res.status(204).json(pushConfig);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
                error: err
            });
        });
};
