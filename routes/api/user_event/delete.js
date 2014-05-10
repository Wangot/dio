var path = require('path')
  , DIOAPI = require(path.resolve('./models/api'));

module.exports = function(req, res) {
    DIOAPI.user_event.delete(req, res);
};