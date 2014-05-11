module.exports = function(server) {
  require('./event')(server);
  require('./user_event')(server);

  require('./event_history')(server);
  require('./post-calamity')(server);
};