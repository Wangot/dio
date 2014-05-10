/**
 * Event Model Definition
**/
module.exports = function(db) {
  
  var Event = db.define('event', {
    name         : { type: 'text', size: 255, required: true },
    description  : { type: 'text', big: true }
  }, {
    methods: {
      // methods here
    }
  });

  // create table
  Event.sync(function(err) {
  
  });

  
  return Event;
}
