// Sylvia
var Items = require('../models/itemModel.js');
var fs = require('fs');
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
    var photo = req.body.item.photos[0];
    var userid = req.body.id;
    console.log('Inside addItem method; photo: ', photo);

    var pathToCreate = './server/assets/images/' + userid + '/';
    var writePath = './server/assets/images/' + userid + '/' + 'eggs.jpg';

    mkdirp(pathToCreate, function(err) {
      if (err) {
        console.log('error creating path: ', err);
      } else {
        console.log('--------> NEW PATH CREATED <----------');
        fs.writeFile(writePath, photo, function(err) {
          if (err) {
            console.log('error saving image: ', err);
          } else {
            console.log('image saved to: ', writePath);
          }
        });     
      }
    });

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