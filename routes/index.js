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

    server.get('/testAPI', testAPI);

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

var testAPI = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceNoahAPI = require(servicePath + '/noah_API.js');
  serviceNoahAPI.getFourHourForeCast(function(err, data) {
    res.json(200, data);
  });
}