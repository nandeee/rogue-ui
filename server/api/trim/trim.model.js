'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrimSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Trim', TrimSchema);