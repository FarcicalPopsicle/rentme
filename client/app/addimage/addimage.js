// David
// Controller for adding items
angular.module('e-Commer.addImage', ['ngMaterial', 'ngFileUpload'])
.controller('addImageController', function ($scope, Upload, $timeout, $window, $location, Item) {

  $scope.uploadFiles = function(files) {
    $scope.files = files;
    console.log('UPLOAD FILES CALLED');
    console.log('the files are: ', files);
    if (files && files.length) {
      Item.addImages(files);


   
        // Upload.upload({
        //     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        //     data: {
        //         files: files
        //     }
        // }).then(function (response) {
        //     $timeout(function () {
        //       console.log(response.data);
        //       $scope.result = response.data;
        //     });
        // }, function (response) {
        //     if (response.status > 0) {
        //       $scope.errorMsg = response.status + ': ' + response.data;
        //     }
        // }, function (evt) {
        //     $scope.progress = 
        //         Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        // });
    }
  };

  $scope.checkController = function() {
    console.log('CONTROLLER WORKS');
  };
});












































// var app = angular.module('fileUpload', ['ngFileUpload']);

// app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
//     $scope.uploadFiles = function(files, errFiles) {
//         $scope.files = files;
//         $scope.errFiles = errFiles;
//         angular.forEach(files, function(file) {
//             file.upload = Upload.upload({
//                 url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
//                 data: {file: file}
//             });

//             file.upload.then(function (response) {
//                 $timeout(function () {
//                     file.result = response.data;
//                 });
//             }, function (response) {
//                 if (response.status > 0)
//                     $scope.errorMsg = response.status + ': ' + response.data;
//             }, function (evt) {
//                 file.progress = Math.min(100, parseInt(100.0 * 
//                                          evt.loaded / evt.total));
//             });
//         });
//     }
// }]);