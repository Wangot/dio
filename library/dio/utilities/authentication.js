var path = require('path')
  , modelsPath = path.resolve('./models/orm')
  , User = require(path.join(modelsPath, '/user'))(req.db)
  , userInstance = null
  , app = null
  , passport = null;

function Authentication(app, passport) {
  this.app = app;
  this.passport = passport;
}

Authentication.prototype.run = function() {

  // for username and password
  this.local();

  // social - [fb,etc..,]
  //this.social
}

Authentication.prototype.local = function() {
  var LocalStrategy = require('passport-local').Strategy;
  
  // Local
  this.passport.use(new LocalStrategy(function(username, password, done) {
    User.find({username:username}, function(err, users){
      if (err){
        done(null, false, 'Unknown user');
      } else {
        var user = users[0];
        // Validate password
        var encryptedPassword = User.encryptPassword(password);
        // console.log(encryptedPassword);
        if (user.password != encryptedPassword) {
          return done(null, false, 'Invalid password'); // TODO put appropiate message
        }

        return done(null, user);
      }
    });

  }));

  // Serialize
  this.passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  // Deserialize
  this.passport.deserializeUser(function(id, done) {
    // change
    User.get(id, function(err, user){
      if (err){
        done(err);
      } else {
        var userInstance = {
          id: user.id,
          username: user.username
        }

        done(null, userInstance);
      }
    });
  });
}

Authentication.prototype.social = function() {
   //var  FacebookStrategy = require('passport-facebook').Strategy

  // Facebook
  // if (app.get('facebook-oauth-key')) {
  //   passport.use(new FacebookStrategy({
  //     clientID: app.get('facebook-oauth-key'),
  //     clientSecret: app.get('facebook-oauth-secret')
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     // Hand off to caller
  //     done(null, false, {
  //       accessToken: accessToken,
  //       refreshToken: refreshToken,
  //       profile: profile
  //     });
  //   }));
  // }
}

module.exports = Authentication;