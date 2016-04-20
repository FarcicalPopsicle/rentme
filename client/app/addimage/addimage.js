// David
// Controller for adding items
angular.module('e-Commer.addImage', ['ngMaterial'])
.controller('addImageController', function ($scope, $window, $location) {

  $scope.uploadFiles = function() {
    console.log('UPLOAD FILES CALLED');
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