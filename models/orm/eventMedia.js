/**
 * EventMedia Model Definition
**/
module.exports = function(db) {
  
  var EventMedia = db.define('event_media', {
  }, {
    methods: {
      // methods here
    }
  });

  var Media = require('./media')(db);
  var EventHistory = require('./eventHistory')(db);

  EventMedia.hasOne('article', Media, { reverse: 'event_medias', required: true });

  EventMedia.hasOne('event_history', EventHistory, { reverse: 'event_medias', required: true });

  // create table
  EventMedia.sync(function(err) {
  
  });

  
  return EventMedia;
}
