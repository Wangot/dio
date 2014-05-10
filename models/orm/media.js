/**
 * Media Model Definition
**/
module.exports = function(db) {
  
  var Media = db.define('media', {
    type          : { type: 'enum', values: ['IMAGE', 'VIDEO']},
    filename      : { type: 'text', size: 255, required: true },
    download_url  : { type: 'text', big: true },
    description   : { type: 'text', big: true },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  // create table
  Media.sync(function(err) {
  
  });

  
  return Media;
}