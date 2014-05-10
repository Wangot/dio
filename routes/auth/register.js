var path = require('path'),
  fs = require('fs'),
  modelsPath = path.resolve('./models/orm');
var Q = require('q');

module.exports = function(server) {
  	// LOGIN
  server.get('/register',
    function(req, res, next){
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    }
    next();
    },
    function(req, res){
      var db = req.db;
      var Event = require(path.join(modelsPath, '/event'))(db);

      Q.ninvoke(Event,'find')
      .then(function(disasters){
        res.render('public/site/register', { title: 'Registration', disasters: disasters});
        return true;
      })
      .fail(function(err) {
        console.log(err);
        req.flash('error', err.message);
        res.render('public/site/register', { title: 'Registration', disasters:{} });
      });
    }
  );


  // actual registration
  server.post('/register', function(req, res, next){
	  var postData = req.body;
    var db = req.db;
    var User = require(path.join(modelsPath, '/user'))(db);
    var Contact = require(path.join(modelsPath, '/contact'))(db);
    var UserAlertSetting = require(path.join(modelsPath, '/userAlertSetting'))(db);

    // process starts here
    Q.ninvoke(User, 'count', { email: postData.email })
    .then(function(count) {
      if (count > 0) {
        throw new Error('Email already exists.');
      }

      return Q.ninvoke(User, 'count', { username: postData.username });
    })
    .then(function(usernameCount) {
      if (usernameCount > 0) {
        throw new Error('Username already exists.');
      }

      return true;
    })
    .then(function(isValid){
      // validate user input
      var validator = require('validator');

      if(validator.isNull(postData.email) ||
         validator.isNull(postData.password)) {
        throw new Error('Please fill-up all the required fields.');
      }
      
      if (!validator.isEmail(postData.email)) {
        throw new Error('Invalid email address.');
      }

      if (!validator.isLength(postData.password, 6)) {
        throw new Error('Passwords should be more than six characters long.');
      }

      // generate a username based on email
      if (!postData.username) {
        postData.username = User.generateUsername(postData.email);
        postData.display_name = User.generateUsername(postData.email);
      }

      return postData;
    })
    .then(registerUser)
    .fail(function(err) {
      console.log(err);
      req.flash('error', err.message);
      sendResponse();
      // res.render('public/site/register', { title: 'Registration' });
    });

    function registerUser() {
      var accountStatus = 'ACTIVE';
      var successMessage = 'Thank you for joining DIO! ';

      var userData = [{
        username : postData.username,
        password : User.encryptPassword(postData.password),
        email : postData.email,
        display_name : postData.display_name,
        // roles : 'user',
        status : accountStatus,
      }];

      Q.ninvoke(User, 'create', userData)
      .then(createContacts)
      .then(createUserAlertSetting)
      .then(function(data) {
        req.flash('success', successMessage);
        var redirectUrl = '/dashboard';

        // autologin user + redirect to paypal payment page
        var passport = require('passport');
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          
          if (!user) {
            // User is inactive that's why a null is returned
            req.flash('error', info.message);
            return res.redirect('/login');
          }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect(redirectUrl);
          });
        })(req, res, next);
      })
      .fail(function(err) {
        console.log(err, err.stack);
        req.flash('error', 'An error occurred. Try again later.');
        sendResponse();
      });
    }

    function createContacts(users) {
      var contactData = [];
      var user = users[0];
      if (postData.MOBILE_NUMBER && postData.MOBILE_NUMBER.length > 0) {
        var mobileNumbers = postData.MOBILE_NUMBER;
        for (var i = 0; i < mobileNumbers.length; i++) {
          var formattedData = {
            type: 'MOBILE_NUMBER',
            value: mobileNumbers[i],
            user_id: user.id
          };
          contactData.push(formattedData);
        };
      };

      if (postData.EMAILS && postData.EMAILS.length > 0) {
        var emails = postData.EMAILS;
        for (var i = 0; i < emails.length; i++) {
          var formattedData = {
            type: 'EMAIL',
            value: emails[i],
            user_id: user.id
          };

          contactData.push(formattedData);
        };
      };

      if (postData.OTHERS_MOBILE_NUMBER && postData.OTHERS_MOBILE_NUMBER.length > 0) {
        var mobileNumbers = postData.OTHERS_MOBILE_NUMBER;
        for (var i = 0; i < mobileNumbers.length; i++) {
          var formattedData = {
            type: 'OTHERS_MOBILE_NUMBER',
            value: mobileNumbers[i],
            user_id: user.id
          };
          
          contactData.push(formattedData);
        };
      };

      if (postData.OTHERS_EMAIL && postData.OTHERS_EMAIL.length > 0) {
        var emails = postData.OTHERS_EMAIL;
        for (var i = 0; i < emails.length; i++) {
          var formattedData = {
            type: 'OTHERS_EMAIL',
            value: emails[i],
            user_id: user.id
          };

          contactData.push(formattedData);
        };
      };

      return Q.ninvoke(Contact,'create', contactData)
      .then(function(contacts){
        return contacts;
      })
      .fail(function(err) {
        console.log(err);
        throw new Error("Unable to create contacts.")
      });
    }

    function createUserAlertSetting(contacts) {
      var alertSettingData = []

      // contacts and alerts for user
      if (contacts && contacts.length > 0 && 
          postData.disaster && postData.disaster.length > 0) {
        var disasters = postData.disaster;

        for (var i = 0; i < disasters.length; i++) {

          contacts.forEach(function(contact){
            var type;
            if (contact.type == 'MOBILE_NUMBER' || contact.type == 'EMAIL') {
              type = 'SYSTEM';
              alertSettingData.push({
                event_id: disasters[i],
                user_id:contact.user_id,
                contact_id:contact.id,
                type: type
              });
            }
          })

        };
      }; 

      // contacts and alerts for user
      if (contacts && contacts.length > 0 && 
          postData.disaster_relative && postData.disaster_relative.length > 0) {
        var disasters = postData.disaster_relative;

        for (var i = 0; i < disasters.length; i++) {

          contacts.forEach(function(contact){
            var type;
            if (contact.type == 'OTHERS_MOBILE_NUMBER' || contact.type == 'OTHERS_EMAIL') {
              type = 'HELP';
              alertSettingData.push({
                event_id: disasters[i],
                user_id:contact.user_id,
                contact_id:contact.id,
                type: type
              });
            }
          })

        };
      };      

      Q.ninvoke(UserAlertSetting,'create', alertSettingData)
      .then(function(settings){
        return settings;
      })
      .fail(function(err) {
        console.log(err);
        throw new Error("Unable to create settings.")
      });

    }



    function sendResponse() {
      var Event = require(path.join(modelsPath, '/event'))(db);

      Q.ninvoke(Event,'find')
      .then(function(disasters){
        res.render('public/site/register', { title: 'Registration', disasters: disasters});
        return true;
      })
      .fail(function(err) {
        console.log(err);
        req.flash('error', err.message);
        res.render('public/site/register', { title: 'Registration',disasters:{} });
      });
    }
  });
};