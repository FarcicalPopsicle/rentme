var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: 'fordevonly',
  database: 'ecommerce'
});
connection.connect();

module.exports = connection;
