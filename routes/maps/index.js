module.exports = function(router) {
  router.get('/reports', require('./reports'));
  router.get('/report1', require('./report1'));
};