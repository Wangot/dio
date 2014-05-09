var DB = {
  /* DATABASE SETUP (using node-orm2) */
  ormExpress : function(config) {
    var orm = require('orm');
    var connString = getORMConnectionStr(config);

    // prevent the orm from caching records
    orm.settings.set("instance.cache", false);

    return orm.express(connString, {});
  },
  ormManual : function(config) {
    var _db = null;
    var orm = require('orm');
    orm.settings.set("instance.cache", false);

    var connString = getORMConnectionStr(config);

    return orm.connect(connString, function(err, db) {
      if (err) {
        throw err;
      }

      if (Array.isArray(_db)) {
        _db.push(db);
      } else if (_db !== null) {
        _db = [ _db, db ];
      } else {
        _db = db;
      }
      return _db;
    });
  }
};

function getORMConnectionStr(config) {
  return config.protocol + "://" + config.user + ":" + config.password + "@"
      + config.host + ":" + config.port + "/" + config.database;
}

module.exports = DB;