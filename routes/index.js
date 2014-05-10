var passport = require("passport")

exports.attachHandlers = function attachHandlers (server) {
    server.get('/', index);
    
    var publicSite = require('./public');
    publicSite.attachHandlers(server);

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

    // LOGIN
    server.get('/login',
      function(req, res, next){
        if (req.isAuthenticated()) {
          res.redirect('/dashboard');
        }
        next();
      },
      function(req, res){
        res.render('public/site/login', { title: 'Express' });
      }
    );

    server.post('/login',
      passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true }),
      function(req, res){
        // DO NOT REDIRECT HERE BECAUSE successRedirect is already set! 
        // (only do redirection here when this needs to contains the success handler:
        //  i.e.: getting where the user will be redirected based on session's last visited page)
      }
    );
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