module.exports = function(param){
  return function(req, res, next) {
    res.header('Access-Control-Allow-Origin', param);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  };
};