exports.attachHandlers = function attachHandlers (server) {
    server.get('/', index);
    
    //Public page
    require('./public')(server);

    // MAPS
    require('./maps')(server);

    server.get('/dbSync', require("./tools/dbSync"))

    //TODO: Temporary dashboard
    server.get('/dashboard', 
      isAuth,
      function(req, res){
        res.render('public/site/login', { title: 'Express' });
      }
    );

    // Authentication
    require("./auth")(server);
    
    server.get('/dbSync', dbSync);

    server.get('/testAPI', testAPI);
};

var index = function(req, res){
  var path = require('path'),
      modelsPath = path.resolve('./models/orm');
  var User = require(path.join(modelsPath, '/user'))(req.db);

	res.render('public/site/index', { title: 'Express' });
};


<<<<<<< HEAD
var isAuth = function(req, res, next){
  if (req.isAuthenticated()) {
    // Auth
  } else {
    res.redirect('/login');
  }
  next();
}; 
=======
  var User = require(path.join(modelsPath, '/user'))(req.db);
  var Contact = require(path.join(modelsPath, '/contact'))(req.db);
  var Event = require(path.join(modelsPath, '/event'))(req.db);
  var EventHistory = require(path.join(modelsPath, '/eventHistory'))(req.db);
  var Location = require(path.join(modelsPath, '/location'))(req.db);
  var EventLocation = require(path.join(modelsPath, '/eventLocation'))(req.db);
  var Field = require(path.join(modelsPath, '/field'))(req.db);
  var EventField = require(path.join(modelsPath, '/eventField'))(req.db);
  var UserEventHistory = require(path.join(modelsPath, '/userEventHistory'))(req.db);
  var UserAlertSetting = require(path.join(modelsPath, '/userAlertSetting'))(req.db);

  var Article = require(path.join(modelsPath, '/article'))(req.db);
  var EventArticle = require(path.join(modelsPath, '/eventArticle'))(req.db);
  var Attachment = require(path.join(modelsPath, '/attachment'))(req.db);
  var ArticleAttachment = require(path.join(modelsPath, '/articleAttachment'))(req.db);
  var Media = require(path.join(modelsPath, '/media'))(req.db);
  var EventMedia = require(path.join(modelsPath, '/eventMedia'))(req.db);


  res.render('public/site/index', { title: 'Express' });
}

var testAPI = function(req, res) {
  var path = require('path');
  var servicePath = path.resolve('./', 'models', 'service');
  var serviceNoahAPI = require(servicePath + '/noah_API.js');
  serviceNoahAPI.getFourHourForeCast(function(err, data) {
    res.json(200, data);
  });

}
>>>>>>> update dio mysql password
