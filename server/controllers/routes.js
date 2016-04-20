// var itemController = require('itemController.js');
// var userController = require('userController.js');
// var searchController = require('searchController.js');
var authController = require('./authController.js');
var Auth = require('../utility/util.js');
var homeController = require('./homepageController.js');
var itemController = require('./itemController.js');
var profileController = require('./profileController.js');
var checkoutController = require('./checkoutController.js');
/* Routes */

module.exports = function(app, passport) {

  app.post('/signup', passport.authenticate('google'), authController.signup);
  app.post('/signin', authController.signin);
  app.post('/api/getSearchItems', homeController.search);
  app.post('/items/add', itemController.addItem);
  app.post('/items/addItemImage', itemController.addItemImage);
  app.get('/api/getAllUserItem', profileController.getUserItems);
  app.post('/homepage/cart', checkoutController.setItems);

  app.get('/auth/google', passport.authenticate('google', { 
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ] 
  }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      
      res.redirect('/');
    });

}



