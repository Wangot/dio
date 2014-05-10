module.exports = function(){
  return function(req, res) {
  	res.render('public/maps/reports', { title: 'User reports' });
  };
};