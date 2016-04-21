// Sylvia
var Items = require('../models/itemModel.js');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');


// choose function below
module.exports = {
  // get: function (req, res, next) {
  //   Items.items(function(err, results) {
  //     if (!err) { 
  //       res.json(201);
  //     } else {
  //       res.json(err);
  //     }
  //   });
  // },
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
      console.log('old path: ', newPath, 'new path: ', newPath);
      fs.move(oldPath, newPath, function (err) {
        if (err) { 
          return console.error(err); 
        }
        item.photos.push(newPath);
      });
    };

    if (!fileExtensions.hasOwnProperty(fileType)) {
      console.error('File type not handled. add new file types to itemController>addItem>fileExtensionString');
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

    //db stuff

    Items.items(item, function(err, results) {
      if (err) {
        console.error('failed to add item to db');
        res.json(err);
      } else {
        console.log('item added to db');
        res.json(201);
      }
    });
  },
};