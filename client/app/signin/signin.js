//@Author: Jovani
//Controller for the singin user

angular.module('e-Commer.signin', ['ngMaterial'])
.controller('signinController', function ($scope, $window, $location, Auth,$mdToast) {
//signin variable uses int the signin template
$scope.userLogin = {};
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

 $scope.showSimpleToast = function(text) {
    var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .position(pinTo )
        .hideDelay(3000)
    );
  };


  $scope.signin = function () {
    //call the signin factory method and pass the user form
    Auth.signin($scope.userLogin)
      .then(function (data) {
        if(data === 404){
          $scope.showSimpleToast("User or password incorrect!");
          $location.path('/signin');
          $scope.userLogin = {};
        } else {
          $window.localStorage.setItem('com.e-Commer', data.token);
          $scope.user = data.user[0];
          Auth.user = $scope.user;
          $scope.showSimpleToast("Hello "+$scope.user.name);
          $location.path('/homepage');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

