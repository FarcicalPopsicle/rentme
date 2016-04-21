var db = require('../db');

module.exports = {
  items: function (item, callback) {
    var query = 'insert into items (name, description, photo, price) values ("' 
      + item.name + '","'
      + item.description + '","'
      + item.photos[0] + '",'
      + item.price + ')';
    db.query(query, function(err, results) {
      query = 'insert into user_items (user_Id, item_Id) values ('
        + item.userid +',(select id from items where name = "'
        + item.name + '" Limit 1))';
      db.query(query, function(err, results) {
        if (err) {
          console.log('err Item', err);
        } else {
          console.log('Item', results);
          callback(err, results);
        }
      });
    });
  }
};