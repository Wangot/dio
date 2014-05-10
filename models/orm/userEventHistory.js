/**
 * UserEventHistory Model Definition
**/
module.exports = function(db) {
  
  var UserEventHistory = db.define('user_event_history', {
    title         : { type: 'text', size: 500, required: true },
    description   : { type: 'text', big: true },
    note   : { type: 'text', big: true },
    description   : { type: 'text', big: true },
    created       : { type: 'date', time: true },
    latitude    : { type: 'text', size: 255, required: true },
    longtitude  : { type: 'text', size: 255, required: true }
  }, {
    methods: {
      // methods here
    }
  });

  var Event = require('./event')(db);

  var EventLevel = require('./eventLevel')(db);

  var EventHistory = require('./eventHistory')(db);

  UserEventHistory.hasOne('event', Event, { reverse: 'user_event_histories', required: true });

  UserEventHistory.hasOne('event_level', EventLevel, { reverse: 'user_event_histories', required: true });

  UserEventHistory.hasOne('event_history', EventHistory, { reverse: 'user_event_histories', required: true });

  // create table
  UserEventHistory.sync(function(err) {
  
  });

  
  return UserEventHistory;
}
