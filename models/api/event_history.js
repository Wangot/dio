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
    var EventHistory = require(path.join(modelsPath, '/eventHistory'))(req.db);
    var eventDetails = this.formatBeforeCreate(req.body);
    var Contact = require(path.join(modelsPath, '/contact'))(req.db);
    var UserAlertSetting = require(path.join(modelsPath, '/userAlertSetting'))(req.db);

    var mailer = require(path.resolve("./models/service/email.js"));
    var servicePath = path.resolve('./', 'models', 'service');
    var serviceSMSAPI = require(servicePath + '/sms_API.js');
    var eventcreated;

    Q.ninvoke(EventHistory, 'create', eventDetails)
    .then(function(createdEvent){
      eventcreated = createdEvent;
      // get contact of the user
      return Q.ninvoke(UserAlertSetting, 'find', {
        user_id: createdEvent.user_id, 
        event_id: createdEvent.event_id,
        type:'SYSTEM'
      })
    })
    .then(function(userAlertSettings){
      if (userAlertSettings.length > 0) {
        var promises = [];
        for (var i=0; i<userAlertSettings.length; i++) {
          var alertUser = function(alertSetting){
            return Q.ninvoke(Contact, 'get', alertSetting.contact_id)
            .then(function(contact) {

              // compose location url
              var mapUrl = config.baseUrl +'/assist?userEventHistoryId=' + eventcreated.id;
              // compose message
              var message = "Description :"+eventcreated.description ; // TODO

              switch(contact.type) {
                case 'MOBILE_NUMBER':
                  serviceSMSAPI.sendSMS_TWILLIO(message, function(err, data) {
                    // sucessfully sent
                  });
                  break;
                case 'EMAIL':
                  mailer.send(contact.value, "Alertness In Disaster [ALERT]", message +" Location : "+mapUrl, "");
                  break;
                default:
                  break;
              }
              return Q.ninvoke(Contact, 'get', contact.id);
            })
            .fail(function(err) {
              throw new Error('Invalid data.');
            });
          }
          var myPromise = alertUser(userAlertSettings[i]);
          promises.push(myPromise);
        }
        return Q.all(promises);
      } else {
        return true;
      }

    })
    .then(function(createdEvent){
      return res.send(new ApiReturn(true, eventcreated, message.DATA_SUCCESSFULLY_CREATED, eventDetails));
    })
    .fail(function(err) {
      console.log(err);
      return res.send(new ApiReturn(false, err, message.DATA_FAILED_TO_CREATE, eventDetails));
    });
  },
  list: function(req, res){
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
      event_level_id:rawParams.event_level_id
    };
  }
}