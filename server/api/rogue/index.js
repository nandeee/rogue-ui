'use strict';

var express = require('express');
var controller = require('./rogue.controller');

var router = express.Router();

router.get('/*', controller.get);
// router.post('/*', controller.test);
router.post('/*', controller.post);

module.exports = router;
