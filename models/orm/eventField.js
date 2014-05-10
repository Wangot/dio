/**
 * EventField Model Definition
**/
module.exports = function(db) {
  
  var EventField = db.define('event_field', {
    description      : { type: 'text', big: true }
  }, {
    methods: {
      // methods here
    }
  });

  var Event = require('./event')(db);

  var EventHistory = require('./eventHistory')(db);

  var Field = require('./field')(db);

  EventField.hasOne('event', Event, { reverse: 'event_fields', required: true });

  EventField.hasOne('event_history', EventHistory, { reverse: 'event_fields', required: true });

  EventField.hasOne('field', Field, { reverse: 'event_fields', required: true });
  
  // create table
  EventField.sync(function(err) {
  
  });

  
  return EventField;
}
