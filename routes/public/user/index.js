module.exports = function attachHandlers (router) {

   // login page
  // router.get('/login', function(req, res, next){
 //      if (req.isAuthenticated()) {
 //        res.redirect('/private');
 //      }
 //      next();
 //    }, require('./login')());

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  app.get('/login', function(req, res) {
    res.render('public/user/login', { title: 'Login Page' });
  });

  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/loginSuccess',
      failureRedirect: '/loginFailure'
    })
  );
   
  app.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
  });
   
  app.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
  });


  // register
  // router.get('/register', require('./register')());
};