module.exports = function(router) {
  router.get('/advisory', require('./advisory'));
  router.get('/reports', require('./reports'));
};