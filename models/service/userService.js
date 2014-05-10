var Q = require('q');

var path = require('path'),
    modelsPath = path.resolve('./models/orm');

exports.registerFB = function(accessToken, refreshToken, profile, mysqlDbHandle, _callback) {
  // models
  var User = require(path.join(modelsPath, '/user'))(mysqlDbHandle);
  var Authentication = require(path.join(modelsPath, '/authentication'))(mysqlDbHandle);

  var accountStatus = 'ACTIVE';

  // @TODO: move the messages on an i18n sort of module
  var successMessage = 'Thank you for joining Definitely.IO! ';
  
  var myUsername = profile.username || User.generateUsername(profile.emails[0].value);

  var me, mySubscription, myAuth;
  Q.ninvoke(User, 'find', {username: myUsername})
  .then(function(xUsers) {
    if (xUsers.length > 0) {
      // username already exist, append a hash to it
      myUsername = User.appendToUsername(myUsername);
    }

    var userData = [{
      username : myUsername,
      password : User.encryptPassword(profile.id),
      email : profile.emails[0].value,
      display_name : profile.displayName,
      // roles : 'user',
      status : accountStatus,
      // activation_code: activationCode
    }];

    return Q.ninvoke(User, 'create', userData);
  })
  .then(function(item) {
    me = item[0];

    // @TODO: write auth here
    var authData = [{
      provider      : profile.provider,
      uid           : profile.id,
      access_token  : accessToken,
      refresh_token : refreshToken,
      user_id       : me.id
    }];

    return Q.ninvoke(Authentication, 'create', authData)
    .then(function(data) {
      return data[0];
    })
    .fail(function(err) {
      console.log(err, err.stack);
      throw new Error('Cannot create authentication credentials.');
    });
  })
  .then(function(authenticationData) {
    myAuth = authenticationData;

    var returnData = {
      user: me,
      subscription: {},
      authentication: myAuth,
      message: successMessage
    };

    _callback(null, returnData);
  })
  .fail(function(err) {
    _callback(err);
  });

};