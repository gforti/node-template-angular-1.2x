/* GET Angular SPA page */

var bundles = require('../../bundle.result.json');

module.exports.angularApp = function(req, res){
    console.log('controller angularApp');
  res.render('layout', { bundle: bundles });
};