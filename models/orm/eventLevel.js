/**
 * EventLevel Model Definition
**/
module.exports = function(db) {
  
  var EventLevel = db.define('event_level', {
    title         : { type: 'text', size: 500, required: true },
    description   : { type: 'text', big: true },
    image         : { type: 'text', big: true },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  var Event = require('./event')(db);

  EventLevel.hasOne('event', Event, { reverse: 'event_levels', required: true });

  // create table
  EventLevel.sync(function(err) {
  
  });

  
  return EventLevel;
}
