'use strict';

var express = require('express');
var controller = require('./rule.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/getSelections', controller.getSelections);

module.exports = router;
