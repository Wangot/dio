var path = require('path')
  , DIOAPI = require(path.resolve('./models/api'));

module.exports = function(){
  return function(req, res) {
    DIOAPI.event.create(req, res);
  };
};