exports.attachHandlers = function attachHandlers (server) {
  require('./event')(server);
};