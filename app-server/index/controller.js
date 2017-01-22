/* GET Angular SPA page */

var bundles = require('../bundle.result.json'),
    config = require('../../app.config.json');

module.exports.angularApp = function(req, res){
    res.render('layout', { 'bundle' : bundles, 'moduleName' : config.appClient.module });
};