var db = require('../db');

var NUM_ITEMS = 5;

module.exports = {
  search: {
    getAllRandom: function (callback) {
      var queryItems =  'select i.id,i.name,i.description,i.price,i.availability,a.city from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id inner join address a on a.id  = s.address_id ORDER BY RAND() LIMIT '+ NUM_ITEMS;
      db.query(queryItems, function(err, results) {
        callback(err, results);
      });
    },
    getAllItems: function (userSearch, callback) {
      console.log('Inside Model', userSearch);
      if(userSearch.hasOwnProperty('item')){
        var queryItems = 'select i.id,i.name,i.description,i.price,i.availability,a.city from items i inner join user_items ui on ui.item_Id = i.id inner join users s on ui.user_Id = s.id inner join address a on a.id  = s.address_id and a.city ="'+ userSearch.city+'" where i.name = "'+userSearch.item+'"';
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
