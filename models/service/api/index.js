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