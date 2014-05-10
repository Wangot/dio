/**
 * Article Model Definition
**/
module.exports = function(db) {
  
  var Article = db.define('article', {
    title         : { type: 'text', size: 255, required: true },
    content  : { type: 'text', big: true },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  // create table
  Article.sync(function(err) {
  
  });

  
  return Article;
}
