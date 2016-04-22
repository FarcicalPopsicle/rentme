var db = require('../db');

var NUM_ITEMS = 5;

module.exports = {
  profile: function (userId, callback) {
    var resultObj = {};
    var queryRecentItems = 'select i.id,i.name,i.description,i.photo,i.price,s.name as user, ';
    queryRecentItems += 'IFNULL((SELECT SUM(item_rating) / COUNT(*) FROM reviews WHERE items_id = i.id), 0) AS average_rating';
    queryRecentItems += ' FROM items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id where ui.user_Id = ' + userId;
    db.query(queryRecentItems, function(err, results) {
      if (err) {
        console.log('profile query err',err);
      } else {
        resultObj.items4rent = results;
        // get all he reviews for the items
        resultObj.items4rent.forEach(function(e) {
          var queryItemReviews = 'SELECT i.name AS item, r.user_experience, r.item_rating, u.name AS user FROM items i INNER JOIN reviews r ON i.id=r.items_Id INNER JOIN users u ON r.users_Id=u.id WHERE i.name = \'' + e.name + '\';';
          db.query(queryItemReviews, function(err, results) {
            if (err) {
              console.log('item review err: ', err);
            } else {
              e.reviews = results;
            }
          });
        });
      }

      var queryRentingItems = 'select i.id,i.name,i.description,i.photo,i.price,s.name as username, ';
      queryRentingItems += 'IFNULL((SELECT SUM(item_rating) / COUNT(*) FROM reviews WHERE items_id = i.id), 0) AS average_rating';
      queryRentingItems += ' from items i inner join items_renting ri on ri.item_Id = i.id inner join users s on ri.user_Id = s.id where ri.user_Id = ' + userId;
      db.query(queryRentingItems, function(err, results) {
        if (err) {
          console.log('rented items query err',err);
          callback(err, null);
        } else {
          resultObj.itemsRenting = results;
        }
      });

      var queryFeedbackAsARenter = 'SELECT f.experience, f.rating, f.renter_or_rentee, '
        + 'f.users_Id_rentee, f.users_Id_renter, u.name AS rentee, uu.name AS renter FROM '
        + 'feedback f INNER JOIN users u ON u.id = users_Id_rentee INNER JOIN users uu ON '
        + 'uu.id = users_Id_renter WHERE uu.id = ' + userId + ';';
      db.query(queryFeedbackAsARenter, function(err, results) {
        if (err) {
          console.log('renter feedback query err',err);
          callback(err, null);
        } else {
          resultObj.renterFeedback = results;
        }
      });

      var queryFeedbackAsARentee = 'SELECT f.experience, f.rating, f.renter_or_rentee, '
        + 'f.users_Id_rentee, f.users_Id_renter, u.name AS renter, uu.name AS rentee FROM '
        + 'feedback f INNER JOIN users u ON u.id = users_Id_renter INNER JOIN users uu ON '
        + 'uu.id = users_Id_rentee WHERE uu.id = ' + userId + ';';
      db.query(queryFeedbackAsARentee, function(err, results) {
        if (err) {
          console.log('rentee feedback query err', err);
          callback(err, null);
        } else {
          resultObj.renteeFeedback = results;
          callback(err, resultObj);
        }
      });
    });
  },
  rentedItemReturn: function (userId, itemId, callback) {
    // insert feedback
    // insert review
    // delete item from renting items table
  },
};
