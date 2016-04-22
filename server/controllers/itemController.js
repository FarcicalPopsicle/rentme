// Sylvia
var Items = require('../models/itemModel.js');
var fs = require('fs-extra');

module.exports = {
  addItem: function (req, res, next) {
    if (req.files.file) {
      var file = req.files.file;
      var fileType = req.files.file.type;
      console.log('THE FILE: ', file);
    }
    var userId = req.body.userid;
    var itemDetails = req.body;
    var fileExtensions = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/bmp': '.bmp',
    };

    var makeNewFileName = function() {
      return Math.random().toString(36).substring(3) + fileExtensions[fileType];
    };

    var makePath = function() {
      var randomFileName = makeNewFileName();
      return {
        writePath: '../client/assets/images/' + userId + '/' + randomFileName,
        readPath: '../../assets/images/' + userId + '/' + randomFileName,
      };
    };

    var storeImage = function() {
      var oldPath = file.path;
      fs.move(oldPath, newPath.writePath, function (err) {
        if (err) { 
          return console.error(err); 
        }
        item.photos.push(newPath.readPath);
        addItemToDb();
      });
    };
    
    var addItemToDb = function() {
      Items.items(item, function(err, results) {
        if (err) {
          res.json(err);
        } else {
          res.json(201);
        }
      });
    };
    
    var item = {
      userid: itemDetails.userid,
      name: itemDetails.name,
      description: itemDetails.description,
      price: itemDetails.price,
      photos: [],
    };

    if (file) {
      console.log('FOUND PHOTO');
      if (!fileExtensions.hasOwnProperty(fileType)) {
        console.error('File type not handled. add new file types to itemController > addItem > fileExtensionString');
        return;
      }
      var newPath = makePath();
      storeImage();
    } else {
      console.log('NO PHOTO');
      addItemToDb();
    }
  },
};