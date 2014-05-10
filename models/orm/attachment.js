/**
 * Attachment Model Definition
**/
module.exports = function(db) {
  
  var Attachment = db.define('attachment', {
    filename      : { type: 'text', size: 255, required: true },
    download_url  : { type: 'text', big: true },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  // create table
  Attachment.sync(function(err) {
  
  });

  
  return Attachment;
}
