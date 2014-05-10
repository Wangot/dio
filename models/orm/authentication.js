/**
 * App Model Definition
**/
module.exports = function(db) {
  
  var Authentication = db.define('authentication', {
    provider      : { type: 'text', size: 50 },
    uid           : { type: 'text', size: 255 },
    access_token  : { type: 'text', big: true },
    secret        : { type: 'text', big: true },
    expires       : Number,
    refresh_token : { type: 'text', size: 255 },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    hooks : {
      beforeCreate : function() {
        var that = this;
        that.created = new Date();
      },
      beforeSave : function() {
        var that = this;
        that.updated = new Date();
      }
    },
  });

  var User = require('./user')(db);

  // db constraints
  Authentication.hasOne('user', User, { reverse : 'authentications', required: true });

  Authentication.sync(function(err) {

  });
  
  return Authentication;

};