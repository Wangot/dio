module.exports = function(){
  return function(req, res) {
  	res.render('public/site/about', { title: 'ABOUT US' });
  };
};