exports.callAPI = function(apiOptions, cb) {
	var http = require("http");

	var req = http.request(apiOptions, function(res) {
	  res.setEncoding('utf8');
	  var bodyData = '';

	  res.on('data', function (chunk) {
	    bodyData += chunk;
	  });

	  res.on('end', function() {
	   cb(0, bodyData);
	  });
	});
		
	req.on('error', function(e) {
	  cb(1);
	  console.log('problem with request: ' + e.message);
	});	

	req.end();
}

exports.callPOST_API = function(apiOptions, postData, cb) {
	var http = require("http");
	var unirest = require('unirest');

	var headers = apiOptions.headers;
	var url = apiOptions.url;
	//console.log(headers, postData, headers)
	unirest.post(url)
	.headers(headers)
	.send(postData)
	.end(function (response) {
	  console.log(response.body);
	});

	/*
	console.log(postData);

	var req = http.request(apiOptions, function(res) {
	  res.setEncoding('utf8');
	  var bodyData = '';

	  res.on('data', function (chunk) {
	    bodyData += chunk;
	  });

	  res.on('end', function() {
	   cb(0, bodyData);
	  });
	});
		
	req.on('error', function(e) {
	  cb(1);
	  console.log('problem with request: ' + e.message);
	});	

	req.write(postData);
	req.end();
	*/
}