// David
// Controller for adding items
window.item = {};

angular.module('e-Commer.addItem', ['ngMaterial'])
.controller('addItemController', function ($scope, $window, $location, Item, Auth,$mdToast) {

$scope.itemForm = {};
$scope.user = Auth.user;

var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };
  $scope.toastPosition = angular.extend({},last);
  $scope.getToastPosition = function() {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;
    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;
    last = angular.extend({},current);
  }

 $scope.showSimpleToast = function() {
    var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent('Item Saved!')
        .position(pinTo )
        .hideDelay(3000)
    );
  };


  $scope.createItem = function() {
    item = $scope.itemForm;
    item.userid = $scope.user.id;

    console.log('item created: ', item);
    $location.path('/addImage');

  };

  //DELETE THIS LATER DELETE THIS LATER
  $scope.checkController = function() {
    console.log('CONTROLLER WORKS', 'item is: ', item);
  };

  // $scope.addItem = function () {
  //   var info = {id:$scope.user.id, item:$scope.itemForm};
  //   Item.addOne(info)
  //     .then(function () {
  //       $scope.showSimpleToast();
  //       $location.path('/addImage');
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };
  $scope.uploadItem = function() {
    console.log('upload item called');
    Item.addOne(item);
    item = {};
    //add a redirect here
  };

  $scope.addImageToItem = function(files) {
    $scope.files = files;
    console.log('UPLOAD FILES CALLED');
    console.log('the files are: ', files);
    if (files && files.length) {
      item.files = files;
    }
  };
});