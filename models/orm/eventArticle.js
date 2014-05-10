/**
 * EventArticle Model Definition
**/
module.exports = function(db) {
  
  var EventArticle = db.define('event_article', {
  }, {
    methods: {
      // methods here
    }
  });

  var Article = require('./article')(db);
  var EventHistory = require('./eventHistory')(db);

  EventArticle.hasOne('article', Article, { reverse: 'event_articles', required: true });

  EventArticle.hasOne('event_history', EventHistory, { reverse: 'event_articles', required: true });

  // create table
  EventArticle.sync(function(err) {
  
  });

  
  return EventArticle;
}
