var passport = require('passport');

module.exports = function(server) {
  // alternative auth callbacks do not use acl here
  server.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_birthday']}));

  server.get('/auth/facebook/cb', passport.authenticate('facebook', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    var redirectUrl = '/dashboard';
    if (req.isAuthenticated()) {
      if (req.myRedirect) {
        redirectUrl = req.myRedirect;
      }
    } else {
      redirectUrl = '/';
    }

    res.redirect(redirectUrl);
  });
}