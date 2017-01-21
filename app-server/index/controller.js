/* GET Angular SPA page */

var bundles = require('../bundle.result.json'),
    config = require('../../app-task/build.config');

module.exports.angularApp = function(req, res){
    res.render('layout', { 'bundle' : bundles, 'moduleName' : config.js.module });
};