'use strict';

var http = require('http');
var config = require('./config/environment');
var _ = require('lodash');

process.on('uncaughtException', function(err) {
  console.log(err);
});
var cache = {};
exports.get = function(options, req, res) {
  try {
    console.log("INFO : GET " + options.url);
    console.log("DEBUG : GET " + config.pcm.url + options.url);
    var body = '';
    if (cache[options.url]) {
      return res.send(200, JSON.parse(cache[options.url]));
    }
    http.get(config.pcm.url + options.url, function(response) {

      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        console.log('PCM Response : ', typeof(JSON.parse(body)));
        cache[options.url] = body;
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
    console.log(options);
  }
};
exports.post = function(options, req, res) {
  options = _.merge(options, config.pcm.options);
  options.path = options.path + options.url;
  var body = '';
  var request = http.request(options, function(response) {
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      console.log('PCM Response : ', typeof(JSON.parse(body)));
      //TEMP pagination
      //if the returned data is in array form accept pagination args and splice
      // body = JSON.parse(body);
      // if (body.data.length) {
      //     var pageSize = options.pageSize || 10;
      //     var pageIndex = options.pageIndex || 0;
      //     var data = body.data.splice(pageSize * pageIndex, pageSize);
      //     body.data = data;
      // }

      return res.send(200, body);
    });
  }).on('error', function(e) {
    return res.send(500, {
      "success": false,
      "message": 'PCM api failed',
      "data": []
    })
  });
  request.end();
};
