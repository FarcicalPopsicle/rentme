// Sylvia
var Items = require('../models/itemModel.js');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');

module.exports = {
  addItem: function (req, res, next) {
    var file = req.files.file;
    var userId = req.body.userid;
    var fileType = req.files.file.type;
    var itemDetails = req.body;
    var fileExtensions = {
      'image/jpeg': '.jpg',
    };

    var makeNewFileName = function() {
      return Math.random().toString(36).substring(3) + fileExtensions[fileType];
    };

    var makePath = function() {
      return './client/assets/images/' + userId + '/' + makeNewFileName();
    };

    var storeImage = function() {
      var oldPath = file.path;
      fs.move(oldPath, newPath, function (err) {
        if (err) { 
          return console.error(err); 
        }
        item.photos.push(newPath);
        addItemToDb();
      });
    };

    var addItemToDb = function() {
      Items.items(item, function(err, results) {
        if (err) {
          console.error('failed to add item to db');
          res.json(err);
        } else {
          console.log('item added to db');
          res.json(201);
        }
      });
    };

    if (!fileExtensions.hasOwnProperty(fileType)) {
      console.error('File type not handled. add new file types to itemController > addItem > fileExtensionString');
      return;
    }

    var newPath = makePath();

    var item = {
      userid: itemDetails.userid,
      name: itemDetails.name,
      description: itemDetails.description,
      price: itemDetails.price,
      photos: [],
    };

    storeImage();
  },
};