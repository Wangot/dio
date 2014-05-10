exports.attachHandlers = function attachHandlers (server) {
    server.get('/', index);
    
    //Public page
    require('./public')(server);

    // API
    require('./api')(server);

    // MAPS
    require('./maps')(server);

    server.get('/dbSync', require("./tools/dbSync"))

    //TODO: Temporary dashboard
    server.get('/dashboard', 
      isAuth,
      function(req, res){
        res.render('public/site/login', { title: 'Express' });
      }
    );

    // Authentication
    require("./auth")(server);

    server.get('/api/four_hour_forecast', getFourhourForeCast);
    server.post('/send/sms', sendSMS);
};

var index = function(req, res){
  var path = require('path'),
      modelsPath = path.resolve('./models/orm');
  var User = require(path.join(modelsPath, '/user'))(req.db);

	res.render('public/site/index', { title: 'Express' });
};


var isAuth = function(req, res, next){
  if (req.isAuthenticated()) {
    // Auth
  } else {
    res.redirect('/login');
  }
  next();
}; 

var getFourhourForeCast = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceNoahAPI = require(servicePath + '/noah_API.js');
  serviceNoahAPI.getFourHourForeCast(function(err, data) {
    res.json(200, data);
  });
}

var sendSMS = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceSMSAPI = require(servicePath + '/sms_API.js');
  var message = req.body.message;

  serviceSMSAPI.sendSMS_TWILLIO(message, function(err, data) {
    if (!err) {
      res.set('Content-Type', 'text/html');
      res.send(200, 'Message Sent!');
    }
  });
}