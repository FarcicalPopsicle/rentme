var db = require('../db');

var NUM_ITEMS = 5;

module.exports = {
  profile: function (userId, callback) {
    var resultObj = {};
    console.log('userId ', userId);
    
    var queryRecentItems = 'select i.id,i.name,i.description,i.price,s.name as user from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id where ui.user_Id = '+userId;
    db.query(queryRecentItems, function(err, results) {
      if (err) {
        console.log('profile query err',err);
      } else {
        console.log('items4rent query results', results);
        resultObj.items4rent = results;
        // get all he reviews for the items
        resultObj.items4rent.forEach(function(e) {
          console.log('yisss: ', e);
          var queryItemReviews = 'SELECT i.name AS item, r.user_experience, r.item_rating, u.name AS user FROM items i INNER JOIN reviews r ON i.id=r.items_Id INNER JOIN users u ON r.users_Id=u.id WHERE i.name = \'' + e.name + '\';';
          db.query(queryItemReviews, function(err, results) {
            if (err) {
              console.log('item review err: ', err);
            } else {
              console.log('yiss:', e);
              e.reviews = results;
              console.log('yiss:', e.reviews);
            }
          });
        });
      }

      var queryRentingItems = 'select i.id,i.name,i.description,i.price,s.name from items i inner join items_renting ri on ri.item_Id = i.id inner join users s on ri.user_Id = s.id where ri.user_Id = '+userId;
      db.query(queryRentingItems, function(err, results) {
        if (err) {
          console.log('profile query err',err);
        } else {
          console.log('profile query results: ', resultObj);
          resultObj.itemsRenting = results;
          callback(err, resultObj);
        }
      });
    });
  }
};