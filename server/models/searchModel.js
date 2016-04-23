var db = require('../db');

var NUM_ITEMS = 5;

module.exports = {
  search: {
    getAllRandom: function (callback) {
      var resultsObj = {};

      var queryItems =  'select i.id,i.name,i.description,i.photo,i.price,i.availability,a.city,'; 
      queryItems += 'IFNULL((SELECT SUM(item_rating) / COUNT(*) FROM reviews WHERE items_id = i.id), 0) AS average_rating ';
      queryItems += 'from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id inner join address a on a.id  = s.address_id ORDER BY RAND() LIMIT '+ NUM_ITEMS;
      db.query(queryItems, function(err, results) {
        if (err) {
          console.log('item review err: ', err);
        } else {
          resultsObj.randItems = results;
          // get all the reviews for all of the items
          var queryItemReviews = 'SELECT i.id, i.name AS item, r.user_experience, r.item_rating, u.name'
            + ' AS user FROM items i INNER JOIN reviews r ON i.id=r.items_Id INNER JOIN users u'
            + ' ON r.users_Id=u.id ';
          if (results) {
            queryItemReviews += 'WHERE i.id = ' + resultsObj.randItems[0].id;
            for (var i = 1; results[i]; i++) {
              queryItemReviews += ' OR i.id = ' + resultsObj.randItems[i].id;
            }
            queryItemReviews += ';';
          }
          db.query(queryItemReviews, function(err, results) {
            if (err) {
              console.log('item review err: ', err);
            } else {
              resultsObj.reviews = results;
              callback(err, resultsObj);
            }
          });
        }
      });
    },
    getAllItems: function (userSearch, callback) {
      if(userSearch.hasOwnProperty('item')){
        var queryItems = 'select i.id,i.name,i.description,i.photo,i.price,i.availability,a.city from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id inner join address a on a.id  = s.address_id and a.city ="'+ userSearch.city+'" where i.name = "'+userSearch.item+'"';
      } else {
        var queryItems = 'select i.id,i.name,i.description,i.price,i.availability,a.city from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id inner join address a on a.id  = s.address_id and a.city ="'+ userSearch.city+'"';
      }
      // var queryItems = 'select i.id,i.name,i.description,i.price,i.availability from items i inner join users s on i.id = s.item_Id inner join address a on a.id  = s.address_id and a.postalcode = '+userSearch.location+' where i.name = "'+ userSearch.item+'"';
      db.query(queryItems, function(err, results) {
        callback(err, results);
      });
    }
  }
};


// select * from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id inner join address a on a.id  = s.address_id and a.postalcode = 94111 where i.name = 'tennis';
