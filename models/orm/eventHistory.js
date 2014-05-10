/**
 * EventHistory Model Definition
**/
module.exports = function(db) {
  
  var EventHistory = db.define('event_history', {
    title         : { type: 'text', size: 500, required: true },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  var Event = require('./event')(db);

  EventHistory.hasOne('event', Event, { reverse: 'event_histories', required: true });
  
  // create table
  EventHistory.sync(function(err) {
  
  });

  
  return EventHistory;
}
