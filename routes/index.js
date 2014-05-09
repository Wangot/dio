module.exports = function(app) {
  app.get('/', function(req, res){
  var path = require('path'),
    modelsPath = path.resolve('./models/orm');
  var User = require(path.join(modelsPath, '/user'))(req.db);

  var userData = [{
    username : "erick",
    password : User.encryptPassword("abc123"),
    email : "erickson.leynes@98labs.com",
    display_name : "erick",
    status : "ACTIVE",
    activation_code: User.generateActivationCode()
  }];

  User.create(userData, function(err, createdUser){
  	console.log(createdUser);
  })

	res.render('index', { title: 'Express' });
  });
};