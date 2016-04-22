// Sylvia
var Profile = require('../models/profileModel.js');

// choose function below
module.exports = {
  getUserItems: function (req, res, next) {
    var params = req.query.id;
    Profile.profile(params, function(err, results) {
      if (!err) { 
        res.json(results);
      } else {
        res.json(err);
      }
    });
  },
  setReviewAndFeedback: function (req, res, next) {
    Profile.rentedItemReturn(req.body, function (err, results) {
      if (!err) {
        res.json(results);
      } else {
        res.json(err);
      }
    });
  },
};