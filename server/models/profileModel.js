var db = require('../db');

var NUM_ITEMS = 5;

module.exports = {
  profile: function (userId, callback) {
    var resultObj = {};
    console.log('userId ', userId);
    
    var queryRecentItems = 'select i.id,i.name,i.description,i.price,s.name as user from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id where ui.user_Id = '+userId;
    var queryItemReviews = 'SELECT i.name, r.user_experience, r.item_rating, u.name FROM items i INNER JOIN reviews r ON i.id=r.id_items INNER JOIN users u ON r.id_users=u.id'
    db.query(queryItemReviews, function(err, results) {
      console.log('item review results', results);
    });
    db.query(queryRecentItems, function(err, results) {
      console.log('profile query err',err);
      resultObj.items4rent = results;
      console.log('profile query results',resultObj);

      var queryRentingItems = 'select i.id,i.name,i.description,i.price,s.name from items i inner join items_renting ri on ri.item_Id = i.id inner join users s on ri.user_Id = s.id where ri.user_Id = '+userId;

      db.query(queryRentingItems, function(err, results) {
        console.log('profile query err',err);
        resultObj.itemsRenting = results;
        console.log('profile query results',resultObj);
        callback(err, resultObj);
      });
    });
  }
};