/**
 * ArticleAttachment Model Definition
**/
module.exports = function(db) {
  
  var ArticleAttachment = db.define('article_attachment', {
  }, {
    methods: {
      // methods here
    }
  });

  var Article = require('./article')(db);
  var Attachment = require('./attachment')(db);

  ArticleAttachment.hasOne('article', Article, { reverse: 'article_attachments', required: true });

  ArticleAttachment.hasOne('attachment', ArticleAttachment, { reverse: 'article_attachments', required: true });

  // create table
  ArticleAttachment.sync(function(err) {
  
  });

  
  return ArticleAttachment;
}
