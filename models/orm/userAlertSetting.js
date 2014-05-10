/**
 * UserAlertSetting Model Definition
**/
module.exports = function(db) {
  
  var UserAlertSetting = db.define('user_alert_setting', {
    type          : { type: 'enum', values: ['SYSTEM', 'HELP']}
  }, {
    methods: {
      // methods here
    }
  });

  var User = require('./user')(db);
  var Contact = require('./contact')(db);
  var Event = require('./event')(db);

  UserAlertSetting.hasOne('user', User, { reverse: 'user_alert_settings', required: true });

  UserAlertSetting.hasOne('contact', Contact, { reverse: 'user_alert_settings', required: true });

  UserAlertSetting.hasOne('event', Event, { reverse: 'user_alert_settings', required: true });
  
  // create table
  UserAlertSetting.sync(function(err) {
  
  });

  
  return UserAlertSetting;
}
