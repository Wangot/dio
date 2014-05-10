
var path = require('path');
var APIPath = path.resolve('./', 'models', 'service', 'api');
var host = '202.90.153.89';

exports.getFourHourForeCast = function(searchObject, cb) {
	var searchObject = {'location' : 'Alaminos, Pangasinan'};
	var API = require(APIPath + '/index.js');
	var path = '/api/four_hour_forecast';
	var method = 'GET';

	//http://202.90.153.89/api/four_hour_forecast
	var APIOptions = {
	  host: host,
	  port: 80,
	  path: path,
	  method: method
	}

	API.callAPI(APIOptions, function (err, data) {
		var jsonData = JSON.parse(data);
		if (searchObject != '') {
			processJSONResponse(searchObject, jsonData, cb);
		} else {
			cb(err, jsonData);
		}
	});


}

function processJSONResponse(searchObject, jsonData, cb) {
	for (var i in jsonData) {
		if (searchObject.location != '') {
			var location = searchObject.location; 
		}
	}
}
	
exports.getFourDayForeCast = function(cb) {
	var API = require(APIPath + '/index.js');
	var path = '/api/four_day_forecast';
	var method = 'GET';

	//http://202.90.153.89/api/four_hour_forecast
	var APIOptions = {
	  host: host,
	  port: 80,
	  path: path,
	  method: method
	}

	API.callAPI(APIOptions, function (err, data) {
		var jsonData = JSON.parse(data);
		cb(err, jsonData);
	});
}	
