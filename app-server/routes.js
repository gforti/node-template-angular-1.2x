var express = require('express');
var router = express.Router();
var ctrlHome = require('./index/controller');

/* Locations pages */
router.all('/', ctrlHome.angularApp);

module.exports = router;