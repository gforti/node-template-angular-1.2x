/* GET Angular SPA page */
module.exports.angularApp = function(req, res){
    console.log('controller angularApp');
  res.render('layout', {});
};