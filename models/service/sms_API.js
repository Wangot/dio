
exports.sendSMS_SMART = function(cb) {
	var path = require('path');
	var querystring = require('querystring');
	var APIPath = path.resolve('./', 'models', 'service', 'api');
	var host = 'x.smart.com.ph';

	var API = require(APIPath + '/index.js');
	var method = 'POST';

	var utilityPath = path.resolve('./', 'library', 'dio', 'utilities');
	var utilities = require(utilityPath);
	var config = utilities.config.load('config', 'config');

	var senderAddress = config.sms_smart.senderAddress;
	var token = config.sms_smart.token;
	var path = '/1/smsmessaging/outbound/'+ senderAddress +'/requests';

	//http://202.90.153.89/api/four_hour_forecast
	var APIOptions = {
	  url: 'https://x.smart.com.ph/1/smsmessaging/outbound/'+ senderAddress +'/requests',
	  host: host,
	  port: 80,
	  path: path,
	  method: method,
	  headers: {
	  	  'Authorization' : 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
	}

	var postData = {
      'outboundSMSMessageRequest' : {"address" : "acr:authorization", "senderAddress": senderAddress},
      'outboundSMSTextMessage': 'Test SMS API',
	}
	/*
	var outboundSMSMessageRequest = {"address" : "acr:authorization", "senderAddress": senderAddress};
  	var post_data = querystring.stringify({
      'outboundSMSMessageRequest' : outboundSMSMessageRequest,
      'outboundSMSTextMessage': 'Test SMS API',
  	});
	*/

//	var postData = JSON.stringify(postData);
	//var postData = querystring.stringify(postData);

	API.callPOST_API(APIOptions, postData, function (err, data) {
		//console.log(data, postData);
		//var jsonData = JSON.parse(data);
		//cb(err, jsonData);
	});
}

exports.sendSMS_TWILLIO = function(message, cb) {

  var path = require('path');
  var utilityPath = path.resolve('./', 'library', 'dio', 'utilities');
  var utilities = require(utilityPath);
  var config = utilities.config.load('config', 'config');

  var accountSid = config.sms_twillio.account_sid; 
  var authToken = config.sms_twillio.auth_token; 
   
  var client = require('twilio')(accountSid, authToken); 
   
  client.messages.create({  
      to: "+639999848575", 
      from: "+14154758157", 
      body: message,
  }, function(err, message) { 
    cb(err, message);
  });

}