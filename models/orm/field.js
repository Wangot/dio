/**
 * Field Model Definition
**/
module.exports = function(db) {
  
  var Field = db.define('field', {
    name         : { type: 'text', size: 255, required: true },
    description  : { type: 'text', big: true }
  }, {
    methods: {
      // methods here
    }
  });

  // create table
  Field.sync(function(err) {
  
  });

  
  return Field;
}
