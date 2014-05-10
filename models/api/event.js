var path = require('path')
  , ApiReturn = require('./return')
  , url = require('url')
  , message = require(path.resolve('./library/dio/utilities/message'))
  , Q = require('q');

module.exports = {
  create: function(req, res) {
    var path = require('path'),
        modelsPath = path.resolve('./models/orm');

    var Event = require(path.join(modelsPath, '/event'))(req.db);

    var eventDetails = this.formatBeforeCreate(req.body);

    Q.ninvoke(Event, 'create', eventDetails)
    .then(function(createdEvent){
      return res.send(new ApiReturn(true, createdEvent, message.DATA_SUCCESSFULLY_CREATED, eventDetails));
    })
    .fail(function(err) {
      console.log(err);
      return res.send(new ApiReturn(false, err, message.DATA_FAILED_TO_CREATE, eventDetails));
    });
  },
  formatBeforeCreate: function(rawParams) {
    return {
      name:rawParams.name,
      description:rawParams.description
    };
  }
}