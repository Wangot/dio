var path = require('path'),
  fs = require('fs'),
  modelsPath = path.resolve('./models/orm');
var Q = require('q');

module.exports = function(server) {

  server.get('/setting',
    function(req, res, next){
      if (!req.isAuthenticated()) {
        res.redirect('/login');
      }
      next();
    },
    function(req, res){
      var db = req.db;
      var Event = require(path.join(modelsPath, '/event'))(db);

      Q.ninvoke(Event,'find')
        .then(function(disasters){
        res.render('public/user/setting', { title: 'User Setting', disasters: disasters});
        return true;
      })
    }
  );

  server.post('/setting',
    function(req, res, next){
      if (!req.isAuthenticated()) {
        res.redirect('/login');
      }
      next();
    },
    function(req, res){
      var postData = req.body;
      var db = req.db;
      var User = require(path.join(modelsPath, '/user'))(db);
      var Contact = require(path.join(modelsPath, '/contact'))(db);
      var UserAlertSetting = require(path.join(modelsPath, '/userAlertSetting'))(db);

      
    }
  );


}