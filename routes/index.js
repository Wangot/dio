exports.attachHandlers = function attachHandlers (server) {
    server.get('/', index);
    
    //Public page
    require('./public')(server);

    // API
    require('./api')(server);

    // MAPS
    require('./maps')(server);

    server.get('/dbSync', require("./tools/dbSync"))

    //TODO: Temporary dashboard
    server.get('/dashboard', 
      // isAuth,
      function(req, res){
        res.render('public/site/login', { title: 'Express' });
      }
    );

    // Authentication
    require("./auth")(server);

    server.get('/api/four_hour_forecast', getFourhourForeCast);
    server.get('/api/four_day_forecast', getFourDayForeCast);

    server.post('/send/sms', sendSMS);

    require("./user")(server);    
    require('./post_calamity')(server);

    server.post('/upload/image', doUploading);    
};

var index = function(req, res){
  var path = require('path'),
      modelsPath = path.resolve('./models/orm');
  var User = require(path.join(modelsPath, '/user'))(req.db);
  
// var mailer = require(path.resolve("./models/service/email.js"));
// mailer.send("erickson.leynes@98labs.com, eman@98labs.com", "test mail from dio node", "abno ka nyahahahha", "");
	res.render('public/site/index', { title: 'Express' });
};


var isAuth = function(req, res, next){
  if (req.isAuthenticated()) {
    // Auth
  } else {
    res.redirect('/login');
  }
  next();
}; 

var getFourhourForeCast = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceNoahAPI = require(servicePath + '/noah_API.js');
  serviceNoahAPI.getFourHourForeCast(function(err, data) {
    res.json(200, data);
  });
}

var getFourDayForeCast = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceNoahAPI = require(servicePath + '/noah_API.js');
  serviceNoahAPI.getFourDayForeCast(function(err, data) {
    res.json(200, data);
  });
}

var sendSMS = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceSMSAPI = require(servicePath + '/sms_API.js');
  var message = req.body.message;

  serviceSMSAPI.sendSMS_TWILLIO(message, function(err, data) {
    if (!err) {
      res.set('Content-Type', 'text/html');
      res.send(200, 'Message Sent!');
    }
  });
}

var doUploading = function(req, res) {
  var fs = require('fs');
  var path = require('path');

  var uploadPath = path.resolve('./views/resources/uploads/article');
  var articleId = req.session.article_id;
  var imageUploadPath = uploadPath + '/' + articleId;

    var filesData = req.files.files[0],
      fileName = filesData.name,
      fileType = filesData.type,
      tempFilePath = filesData.path;

  var file = fs.readFileSync(tempFilePath);

  fs.stat(imageUploadPath, function(err, stat) {
    if(err == null) {
        copyFromTMP(imageUploadPath + '/' + fileName, file);
    } else if(err.code == 'ENOENT') {
        fs.mkdir(imageUploadPath, function(e) {
          copyFromTMP(imageUploadPath + '/' + fileName, file);
        });
    } else {
        console.log('Some other error: ', err.code);
    }
  });

}

function copyFromTMP(path, bufferFile, cb) {
  var fs = require('fs');
  fs.writeFile(path, bufferFile, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
  }); 
}