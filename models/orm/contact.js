/**
 * Contact Model Definition
**/
module.exports = function(db) {
  
  var Contact = db.define('contact', {
    type          : { type: 'enum', values: ['EMAIL', 'MOBILE_NUMBER', 'OTHERS_EMAIL', 'OTHERS_MOBILE_NUMBER']},
    values        : { type: 'text', big: true, required: true },
    description   : { type: 'text', big: true },
    created       : { type: 'date', time: true },
    updated       : { type: 'date', time: true }
  }, {
    methods: {
      // methods here
    }
  });

  var User = require('./user')(db);

  Contact.hasOne('user', User, { reverse: 'contacts', required: true });
  
  // create table
  Contact.sync(function(err) {
  
  });

  
  return Contact;
}
