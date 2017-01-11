var express = require('express');
var path = require('path');
var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var routes = require('./app-server/routes');
//var routesApiV1 = require('./app_api/v1/routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3010);
app.set('json spaces', 2);
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));


// enable Cross-Origin Resource Sharing (CORS)
app.use(function(reg, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');   
    next();
});

app.use('/', routes);
//app.use('/api/v1', routesApiV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
    app.use(errorHandler());
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});