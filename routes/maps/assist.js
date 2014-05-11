var path = require('path')
    , Q = require('q')
    , modelsPath = path.resolve('./models/orm');
module.exports = function(req, res) {
  var UserEventHistory = require(path.join(modelsPath, '/userEventHistory'))(req.db);

  var getUserEventId = function(req) {
    var userEventHistoryId;
    // accommodate GET and POST or even invoice code passed
    if (req.body.userEventHistoryId) {
      userEventHistoryId = req.body.userEventHistoryId;
    }

    if (!userEventHistoryId) {
      userEventHistoryId = req.query.userEventHistoryId;
    } 

    if (!userEventHistoryId) {
      userEventHistoryId = req.params.userEventHistoryId;
    }

    return userEventHistoryId;
  };

  var userEventHistoryId = getUserEventId(req);

  Q.ninvoke(UserEventHistory, 'get', userEventHistoryId)
  .then(function(userEvent){
    res.render('public/maps/assist', { title: 'User Advisories',userEvent: userEvent });
    return true;
  })
  .fail(function(error) {
    console.log(error, err.stack);
    res.redirect('/');      
  });
};