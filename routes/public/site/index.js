module.exports = function attachHandlers (router) {

  // about us page
  router.get('/about', require('./about'));
  
  // about us page
  router.get('/get-involved', require('./get-involved'));

  // contact page
  // router.get('/contact', require('./contact')());

  // products & services page
  // router.get('/products_services', require('./products_services')());

  // support page
  // router.get('/support', require('./support')());
};