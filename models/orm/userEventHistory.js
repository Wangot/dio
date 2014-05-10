/**
 * UserEventHistory Model Definition
**/
module.exports = function(db) {
  
  var UserEventHistory = db.define('user_event_history', {
    status    : { type: 'enum', values: ['UNREAD', 'READ']},
    note      : { type: 'text', big: true },
    created   : { type: 'date', time: true },
    updated   : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  var User = require('./user')(db);
  var EventHistory = require('./eventHistory')(db);

  UserEventHistory.hasOne('user', User, { reverse: 'user_event_histories', required: true });

  UserEventHistory.hasOne('event_history', EventHistory, { reverse: 'user_event_histories', required: true });

  // create table
  UserEventHistory.sync(function(err) {
  
  });

  
  return UserEventHistory;
}
