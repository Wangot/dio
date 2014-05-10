var path = require('path')
  , DIOAPI = require(path.resolve('./models/api'));

module.exports = function(req, res) {
    DIOAPI.event_history.list(req, res);
};