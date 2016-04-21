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

    console.log('Inside server-side itemController: addItem method. The file: ', file);
    
    var userId = req.body.userid;
    var fileType = req.files.file.type;
    var fileExtensions = {
      'image/jpeg': '.jpg',
    };

    var newFileName = function() {
      return Math.random().toString(36).substring(3) + fileExtensions[fileType];
    };

    var makePath = function() {
      return './client/assets/images/' + userId + '/' + newFileName();
    };

    var storeImage = function() {
      var oldPath = file.path;
      var newPath = makePath();
      console.log('old path: ', newPath, 'new path: ', newPath);
      fs.move(oldPath, newPath, function (err) {
        if (err) { return console.error(err); }
        console.log('file moved to ', newPath);
      });
    };

    var storePath = function() {
      //add to db
    };

    if (!fileExtensions.hasOwnProperty(fileType)) {
      console.error('File type not handled. add new file types to itemController>addItem>fileExtensionString');
      return;
    }

    storeImage();


    // var pathToCreate = './server/assets/images/' + userid + '/';
    // var writePath = './server/assets/images/' + userid + '/' + 'otherImage.jpg';

    // mkdirp(pathToCreate, function(err) {
    //   if (err) {
    //     console.log('error creating path: ', err);
    //   } else {
    //     console.log('--------> NEW PATH CREATED <----------');
    //     fs.writeFile(writePath, photo, function(err) {
    //       if (err) {
    //         console.log('error saving image: ', err);
    //       } else {
    //         console.log('image saved to: ', writePath);
    //       }
    //     });     
    //   }
  // this zombie addItem works, but receives an object representing a file, not the binary
  // addItem: function (req, res, next) {
  //   var photo = req.body.item.photos[0];
  //   var userid = req.body.id;
  //   console.log('Inside addItem method; photo: ', photo);

  //   var pathToCreate = './server/assets/images/' + userid + '/';
  //   var writePath = './server/assets/images/' + userid + '/' + 'otherImage.jpg';

  //   mkdirp(pathToCreate, function(err) {
  //     if (err) {
  //       console.log('error creating path: ', err);
  //     } else {
  //       console.log('--------> NEW PATH CREATED <----------');
  //       fs.writeFile(writePath, photo, function(err) {
  //         if (err) {
  //           console.log('error saving image: ', err);
  //         } else {
  //           console.log('image saved to: ', writePath);
  //         }
  //       });     
  //     }
  //   });

    // fs.writeFile(path, req.body.item.photos[0], function(err) {
    //   if (err) {
    //     console.log('error saving image: ', err);
    //   } else {
    //     console.log('image saved to: ', path);
    //   }
    // });



    // Items.items(req.body,function(err, results) {
    //   if (!err) { 
    //     res.json(201);
    //   } else {
    //     res.json(err);
    //   }
    // });
  },
};