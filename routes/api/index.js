module.exports = function(server) {
  require('./event')(server);
  require('./user_event')(server);
};