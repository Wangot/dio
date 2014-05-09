/**
 * User Model Definition
**/
module.exports = function(db) {
  
  var User = db.define('user', {
    username      : { type: 'text', size: 100, required: true },
    password      : { type: 'text', size: 255, required: true },
    email         : { type: 'text', size: 100, required: true },
    display_name  : { type: 'text', size: 100 },
    status        : { type: 'text', size: 40, defaultValue: 'INACTIVE'},
    activation_code: { type: 'text', size: 100 }
  }, {
    methods: {
      // methods here
    }
  });
  
  // create table
  User.sync(function(err) {
  
  });

  User.encryptPassword = function(password){
    // load flat iron instance within this method only
    var crypto = require('crypto');
    
    // get the salt to a config OR create a salt per user
    var salt = 'c8c70862174ddbcfcf82269a4497e292f0e408bb';

    // encrypt password using crypto module (http://nodejs.org/api/crypto.html)
    var cipher = crypto.createCipher('aes-256-cbc', salt);
    var encrypt = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

    return encrypt; 
  }

  User.generateActivationCode = function(username, email) {

    var maxCodeLength = 100;

    // load flat iron instance within this method only
    var crypto = require('crypto');
    
    // get the salt to a config OR create a salt per user
    var salt = 'c8c70862174ddbcfcf82269a4497e292f0e408bb';
    
    var d = new Date();

    var cipherSubject = username + email + d.toUTCString();

    // encrypt password using crypto module (http://nodejs.org/api/crypto.html)
    var cipher = crypto.createCipher('aes-256-cbc', salt);
    var activationCode = cipher.update(cipherSubject, 'utf8', 'hex') + cipher.final('hex');

    // substring the code if it exceeds the maxLength
    if (activationCode.length > maxCodeLength) {
      activationCode = activationCode.substring(0, maxCodeLength);
    }

    return activationCode;
  }
  
  return User;
}
