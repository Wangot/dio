module.exports = function(req, res){
  var path = require('path'),
      modelsPath = path.resolve('./models/orm');

  var User = require(path.join(modelsPath, '/user'))(req.db);
  var Contact = require(path.join(modelsPath, '/contact'))(req.db);
  var Event = require(path.join(modelsPath, '/event'))(req.db);
  var EventHistory = require(path.join(modelsPath, '/eventHistory'))(req.db);
  var Field = require(path.join(modelsPath, '/field'))(req.db);
  var EventField = require(path.join(modelsPath, '/eventField'))(req.db);
  var UserEventHistory = require(path.join(modelsPath, '/userEventHistory'))(req.db);
  var UserAlertSetting = require(path.join(modelsPath, '/userAlertSetting'))(req.db);
  var EventLevel = require(path.join(modelsPath, '/eventLevel'))(req.db);
  var Article = require(path.join(modelsPath, '/article'))(req.db);
  var EventArticle = require(path.join(modelsPath, '/eventArticle'))(req.db);
  var Attachment = require(path.join(modelsPath, '/attachment'))(req.db);
  var ArticleAttachment = require(path.join(modelsPath, '/articleAttachment'))(req.db);
  var Media = require(path.join(modelsPath, '/media'))(req.db);
  var EventMedia = require(path.join(modelsPath, '/eventMedia'))(req.db);


  res.render('public/site/index', { title: 'Express' });
}