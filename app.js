/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var utilities = require('./library/dio/utilities');
var config = utilities.config.load('config', 'config');

// Database configuration
var ormDB = utilities.db.ormManual(config.db);
app.use(function (req, res, next) {
  req.db = ormDB;
  next();
});

// Application environment settings
app.set('port', process.env.PORT || 3000); // port to be use
app.set('views', path.join(__dirname, 'views')); // routes for views
var engine = require('ejs-locals'); // view engine 
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/views/resources'))); // resources

app.use(express.bodyParser());

// Session settings
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.configure(function () {
  // Other application environment settings
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
  
  /* ROUTES */
  app.use(app.router);

  var routes = require('./routes');
  routes.attachHandlers(app);
  /* END ROUTES */

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});