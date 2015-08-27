'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FabricSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Fabric', FabricSchema);