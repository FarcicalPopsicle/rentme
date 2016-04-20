var User = require('../models/userModel.js');
var jwt = require('jwt-simple');

module.exports = {
  //Not used anymore, uses passport authenticate instead
  signin: function (req, res, next) {
    if (req.user) {
      var token = jwt.encode(req.user, 'secret');
      res.json({ 
        'token': token,
        'user': req.user
      });
    } else {
      res.json('404');
    }
  },
  signup: function (req, res, next) {
    var user = req.body;
    console.log('User',user);
    User.users.post(user, function(err, results){
      if (!err) {
        res.json(201);
      }
      else {
        res.json(err);
      }
    });
  }
};
