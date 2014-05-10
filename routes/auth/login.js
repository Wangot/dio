var passport = require("passport");

module.exports = function(server) {
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