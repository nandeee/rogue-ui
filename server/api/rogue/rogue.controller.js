'use strict';

var _ = require('lodash');
var http = require('http');
var config = require('../../config/environment');
var querystring = require('querystring');

exports.get = function(req, res) {
  try {
    console.log("INFO : GET " + req.url);
    var body = '';
    console.log("URL : GET " + config.pcm.url + req.url)
    http.get(config.pcm.url + req.url, function(response) {
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        console.log('PCM Response : ', typeof(JSON.parse(body)));
        return res.send(200, JSON.parse(body));
      });
    }).on('error', function(e) {
      return res.send(500, {
        "success": false,
        "message": 'PCM api failed',
        "data": []
      })
    });
  } catch (err) {
    console.log('Error');
    console.log(err);
  }
};

exports.post = function(req, res) {
  var options = config.pcm.options;
  options.headers = {};
  options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  options.path = '/rogue/api/v1/en/in' + req.url;
  options.method = "POST";
  var data = {
    data: JSON.stringify(req.body)
  };
  var str = querystring.stringify(data);
  // options.headers['Content-Length'] = str.length;
  var body = '';
  var request = http.request(options, function(response) {
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      console.log('PCM Response : ', JSON.parse(body));
      return res.json(200, JSON.parse(body));
    });
  }).on('error', function(e) {
    return res.send(500, {
      "success": false,
      "message": 'PCM api failed',
      "data": []
    })
  });
  request.write(str);
  request.end();
};
