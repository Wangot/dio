exports.attachHandlers = function attachHandlers (server) {
    server.get('/', index);
    
    //Public page
    require('./public')(server);

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