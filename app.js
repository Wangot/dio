/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var flash = require('express-flash');

var app = express();

var utilities = require('./library/dio/utilities');

app.use(utilities.cors('*'));

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
app.use(flash());

var passport = require('passport');

app.configure(function () {
  // Other application environment settings
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  /* AUTHENTICATION */

  // using passport
  app.use(passport.initialize());
  app.use(passport.session());

  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var User = require(path.resolve('./models/orm/user'))(ormDB);

    User.get(id, function(err, user) {
      if (err) {
        done(null, false, { message: 'Invalid Credentials' });
      } else {
        done(null, user);
      }
    });
  });

  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      var User = require(path.resolve('./models/orm/user'))(ormDB);
      User.find({ username: username }, function(err, user) {
        if (err) { 
          return done(err); 
        }
        
        // user result is in array format so we get only the first array result
        if (!user[0]) {
          return done(null, false, { message: 'The email or password you entered is incorrect.' });
        }
        
        // encrypt the passed password then compare
        var encryptedPassword = User.encryptPassword(password);
        if(user[0].password != encryptedPassword) {
          return done(null, false, { message: 'The email or password you entered is incorrect.' });
        } else if (user[0].status == 'INACTIVE') {
          return done(null, false, { message: 'The user is either invalid or deactivated.' });
        } else {
          var userInstance = { 
            id: user[0].id,
            username: user[0].username,
            password: user[0].password,
            displayName: user[0].displayName
          };
          
          return done(null, userInstance);
        }
        
      });
    }
  ));
  /*
  var FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(new FacebookStrategy({
      clientID: config.facebookApp.appID,
      clientSecret: config.facebookApp.appSecret,
      callbackURL: config.facebookApp.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      var Q = require('q');
      var User = require(path.resolve('./models/orm/user'))(ormDB);
      var Authentication = require(path.resolve('./models/orm/authentication'))(ormDB);

      var userService = require(path.resolve('./models/service/userService'));
      
      var me;
      Q.ninvoke(Authentication, 'find', {provider: profile.provider, uid: profile.id})
      .then(function(users) {
        // if users not found, register 'em;
        if (users.length == 0) {
          Q.ninvoke(userService, 'registerFB', accessToken, refreshToken, profile, ormDB)
          .then(function(data) {
            req.myRedirect = '/template/gallery';
            done(null, data.user);
          })
          .fail(function(err) {
            console.log(err, err.stack);
            done(new Error('Cannot register user.'))
          });
        } else if (users.length == 1) {
          var fbAuth = users[0];

          User.get(fbAuth.user_id, function(err, xUser) {
            me = xUser;
            done(err, me);
          });

        } else {
          console.log(err, err.stack);
          done(new Error('Invalid authentication data.'));
        }
      })
      .fail(function(err) {
        done(err);
      });

    }
  ));

  */

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