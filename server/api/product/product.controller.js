'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var pcm = require('../../pcm');

// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.doIt = function (req, res) {
  console.log("TEST: PRODUCT");
  /*var options = {
    url: "fabrics/category/" + req.params.category +
      '/?fields=name,mfPrice,description,images&status=production' +
      '&index=' + req.params.index + '&size=' + req.params.size,
  }*/
  var options = {
    // url: "fabrics/category/" + req.params.category +
    //   '?fields=name,mfPrice,description,images,blendDescription,blendCount,blendDesign&status=production'
    url: "products/category/mens-suits"
    // url: "fabrics/category/" + req.params.category +
    //   // '?complete=true'
    //   '?index=1&size=10&complete=true'
  }
  pcm.get(options, req, res);
}

function handleError(res, err) {
  return res.status(500).send(err);
}
