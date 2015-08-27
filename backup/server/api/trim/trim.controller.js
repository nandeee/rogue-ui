'use strict';

var _ = require('lodash');
var request = require('request');
var Trim = require('./trim.model');
var querystring = require('querystring');

// Get list of trims
exports.index = function(req, res) {
  Trim.find(function (err, trims) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trims);
  });
};

// Get a single trim
exports.show = function(req, res) {
  Trim.findById(req.params.id, function (err, trim) {
    if(err) { return handleError(res, err); }
    if(!trim) { return res.status(404).send('Not Found'); }
    return res.json(trim);
  });
};

// Creates a new trim in the DB.
exports.create = function(req, res) {
  console.log('It happened');
  console.log(req.body.data[0]);
  // console.log(typeof req.body);
  console.log(req.body.data[0].content);
  request.post({url:'http://rogue-dev.creyate.biz:8080/rogue/api/v1/en/in/trims/tapes', form: req.body}, function(err,httpResponse,body){
    console.log(body);
  });
  // request.post({url:'http://rogue-dev.creyate.biz:8080/rogue/api/v1/en/in/trims/tapes', formData: req.body}, function optionalCallback(err, httpResponse, body) {
  //   if (err) {
  //     return console.error('upload failed:', err);
  //   }
  //   console.log('Upload successful!  Server responded with:', body);
  // });
  // Trim.create(req.body, function(err, trim) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(trim);
  // });
};

// Updates an existing trim in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Trim.findById(req.params.id, function (err, trim) {
    if (err) { return handleError(res, err); }
    if(!trim) { return res.status(404).send('Not Found'); }
    var updated = _.merge(trim, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(trim);
    });
  });
};

// Deletes a trim from the DB.
exports.destroy = function(req, res) {
  Trim.findById(req.params.id, function (err, trim) {
    if(err) { return handleError(res, err); }
    if(!trim) { return res.status(404).send('Not Found'); }
    trim.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
