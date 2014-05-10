/**
 * Location Model Definition
**/
module.exports = function(db) {
  
  var Location = db.define('location', {
    latitude    : { type: 'text', size: 255, required: true },
    longtitude  : { type: 'text', size: 255, required: true }
  }, {
    methods: {
      // methods here
    }
  });

  // create table
  Location.sync(function(err) {
  
  });

  
  return Location;
}
