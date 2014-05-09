module.exports = {
    load: function(filePath, fileName) {
      var nodeEnv = process.env.NODE_ENV || 'development';
      var ext = '.json';
      var path = require('path');
      var name = fileName + '-' + nodeEnv + ext;
        
      var configFilename = path.join(path.resolve(filePath), name);
      return require(configFilename);
    }
};