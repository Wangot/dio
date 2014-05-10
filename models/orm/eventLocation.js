/**
 * EventLocation Model Definition
**/
module.exports = function(db) {
  
  var EventLocation = db.define('event_location', {
    status    : { type: 'enum', values: ['NEW', 'VERIFIED']},
    note      : { type: 'text', big: true },
    created   : { type: 'date', time: true },
    updated   : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  var Location = require('./location')(db);
  var EventHistory = require('./eventHistory')(db);

  EventLocation.hasOne('location', Location, { reverse: 'event_location', required: true });

  EventLocation.hasOne('event_history', EventHistory, { reverse: 'event_locations', required: true });

  // create table
  EventLocation.sync(function(err) {
  
  });

  
  return EventLocation;
}
