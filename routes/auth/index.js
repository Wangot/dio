module.exports = function(server) {
    require('./login')(server);

    require('./register')(server);

    require('./logout')(server);
};