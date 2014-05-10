var Q = require('q');
var orm = require('orm');
var url = require('url');
var path = require('path');
var ApiReturn = require('./return');
var modelsPath = path.resolve('./models/orm');
var message = require(path.resolve('./library/dio/utilities/message'));
var dateformat = require('dateformat');

module.exports = {
  create: function(req, res) {
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
  list: function(req, res){
    var Event = require(path.join(modelsPath, '/event'))(req.db);
    var params = req.query;

    var filter = this.filterList(params);

    var EventHistory = require(path.join(modelsPath, '/eventHistory'))(req.db);

    EventHistory.find(filter, function(err, events){
      if(err) {
        console.log(err);
        res.send(new ApiReturn(false, err, message.ERROR, params));
      }

      // FORMAT the data to be returned
      var arrTemp = [];
      events.forEach(function(event){
        console.log(event);
        var temp = {
          id: event.id,
          title: event.title,
          description: event.description,
          created: event.created,
          "event": event.Event.name,
          eventId: event.Event.id,
          eventDescription: event.Event.description,
          latitude: event.latitude,
          longitude: event.longitude

        };

        arrTemp.push(temp);
      });

      res.send(new ApiReturn(true, arrTemp, "", params));
    });

  },


  filterList: function(params){
    var filterData = {};

    if (params.event) {
      filterData.event_id = orm.eq(params.event);
    }

    if (params.dateFrom && params.dateTo) {
      if(params.dateFrom) {
        var dateFrom = new Date(params.dateFrom);
      } else {
        var dateFrom = new Date();
      }
      dateFrom.setHours(0,0,0,0);

      if(params.dateTo) {
        var dateTo = new Date(params.dateTo);
      } else {
        var dateTo = new Date();
      }
      dateTo.setHours(23,59,59,59);

      filterData.created = orm.between(dateformat(dateFrom, "yyyy-mm-dd h:MM:ss"), dateformat(dateTo, "yyyy-mm-dd h:MM:ss"));
    }

    return filterData; 
  },
  formatBeforeCreate: function(rawParams) {
    return {
      name:rawParams.name,
      description:rawParams.description
    };
  }
}