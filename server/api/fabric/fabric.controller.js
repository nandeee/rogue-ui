'use strict';

var _ = require('lodash');
var Fabric = require('./fabric.model');
var pcm = require('../../pcm');

var fabrics = [];

// Get list of fabrics
exports.index = function (req, res) {
  res.json(fabrics);
};

exports.show = function (req, res) {
  var options = {
    url: "fabrics/" + req.params.id
  };
  pcm.get(options, req, res);
};

exports.getIdForCategory = function (req, res) {
  console.log("TEST2");
  var data = req.query;
  var addParam = data.hasOwnProperty('fields') ? ('?fields=' + data.fields) : '';
  var options = {
    url: "fabrics/" + req.params.category + "/" + req.params.id + addParam
  };
  pcm.get(options, req, res);
}

exports.getByCategory = function (req, res) {
  console.log("TEST");
  /*var options = {
    url: "fabrics/category/" + req.params.category +
      '/?fields=name,mfPrice,description,images&status=production' +
      '&index=' + req.params.index + '&size=' + req.params.size,
  }*/
  var options = {
    // url: "fabrics/category/" + req.params.category +
    //   '?fields=name,mfPrice,description,images,blendDescription,blendCount,blendDesign&status=production'
    url: "fabrics/category/" + req.params.category +
      // '?complete=true'
      '?index=1&size=10&complete=true'
  }
  pcm.get(options, req, res);
}
exports.search = function (req, res) {
  var data = req.query;
  var options = {
    url: "fabrics/" + req.params.category + "/search?data=" + data.data + '&fields=fabricId',
  }
  pcm.get(options, req, res);
}


exports.getByIds = function (req, res) {
  var data = req.query;
  var options = {
    url: "fabrics/fetchFabricsInfo/?data=" + data.data + "&category=" + data.category
  }
  pcm.get(options, req, res);
};
