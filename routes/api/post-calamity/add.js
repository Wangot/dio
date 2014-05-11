var path = require('path')
  , DIOAPI = require(path.resolve('./models/api'));

module.exports = function(req, res) {
    DIOAPI.article.create(req, res);
};