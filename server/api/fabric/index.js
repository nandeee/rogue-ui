'use strict';

var express = require('express');
var controller = require('./fabric.controller');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

router.get('/', controller.index);
router.get('/fetchFabricsInfo', controller.getByIds);
router.get('/:category/search', controller.search);
router.get('/:id', controller.show);
router.get('/category/:category', controller.getByCategory);
router.get('/:category/:id', controller.getIdForCategory);

module.exports = router;
