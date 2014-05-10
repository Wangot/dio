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
    var UserEventHistory = require(path.join(modelsPath, '/userEventHistory'))(req.db);
    var eventDetails = this.formatBeforeCreate(req.body);

    Q.ninvoke(UserEventHistory, 'create', eventDetails)
    .then(function(createdEvent){
      return res.send(new ApiReturn(true, createdEvent, message.DATA_SUCCESSFULLY_CREATED, eventDetails));
    })
    .fail(function(err) {
      console.log(err);
      return res.send(new ApiReturn(false, err, message.DATA_FAILED_TO_CREATE, eventDetails));
    });
  },
  list: function(req, res){
    var params = req.query;

    var filter = this.filterList(params);

    var UserEventHistory = require(path.join(modelsPath, '/userEventHistory'))(req.db);

    UserEventHistory.find(filter, function(err, events){
      if(err) {
        console.log(err);
        res.send(new ApiReturn(false, err, message.ERROR, params));
      }

      // FORMAT the data to be returned
      var arrTemp = [];
      events.forEach(function(event){
        var temp = {
          id: event.id,
          title: event.title,
          description: event.description,
          created: event.created,
          "event": event.event.name,
          eventId: event.event.id,
          eventDescription: event.event.description,
          latitude: event.latitude,
          longitude: event.longitude
        };

        arrTemp.push(temp);
      });

      res.send(new ApiReturn(true, arrTemp, "", filter));
    });

  },


  filterList: function(params){
    var filterData = {};

    if (params.event && params.event != "all") {
      filterData.event_id = orm.eq(params.event);
    }

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

    filterData.created = orm.between(dateformat(dateFrom, "yyyy-mm-dd H:MM:ss"), dateformat(dateTo, "yyyy-mm-dd H:MM:ss"));

    return filterData; 
  },
  formatBeforeCreate: function(rawParams) {
    return {
      title:rawParams.title,
      description:rawParams.description,
      latitude:rawParams.latitude,
      longitude:rawParams.longitude,
      event_id:rawParams.event_id,
      status:rawParams.status || 'NEW',
      event_level_id:rawParams.event_level_id,
      note:rawParams.note || '',
      user_id:rawParams.user_id
    };
  }
}