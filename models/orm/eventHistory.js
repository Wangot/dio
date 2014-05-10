/**
 * EventHistory Model Definition
**/
module.exports = function(db) {
  
  var EventHistory = db.define('event_history', {
    title         : { type: 'text', size: 500, required: true },
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

  EventHistory.hasOne('event', Event, { reverse: 'event_histories', required: true });

  EventHistory.hasOne('event_level', Event, { reverse: 'event_histories', required: true });
  
  // create table
  EventHistory.sync(function(err) {
  
  });

  
  return EventHistory;
}
