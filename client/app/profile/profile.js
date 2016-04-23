var app = angular.module('e-Commer.profile', []);

app.controller('profileCtrl', function($mdDialog, $scope, $location, profileFac, Auth) {
  $scope.info = {};

  $scope.user = Auth.user;
  // console.log($scope.user.id); // undefind
  profileFac.getUser($scope.user.id).then(function(items){
    $scope.info = items;
  });

  $scope.returnItem = function(ev,item) {
    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      preserveScope: true,  // do not forget this if use parent scope
      templateUrl: '/app/profile/returnItemTemplate.html',
      targetEvent: event,
      clickOutsideToClose:true,
      controller: function DialogController($scope, $mdDialog, $http) {
        $scope.item = item;
        $scope.rating_item = 1;
        $scope.rating_renter = 1;
        $scope.user_experience = '';
        $scope.renter_feedback = '';
        $scope.values = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 }
        ];
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.returnAndSendFeedback = function() {
          var data = {
            renter_id: Auth.user.id,
            rentee_id: item.ownerid,
            review: {
              item_id: item.id,
              item_rating: $scope.rating_item,
              user_experience: $scope.user_experience,
            },
            feedback: {
              rating: $scope.rating_renter,
              experience: $scope.renter_feedback,
            }
          }
          $mdDialog.hide();
          return $http({
            method: 'POST', 
            url: '/api/reviewFeedback', 
            data: data 
          }).then(function(res) {
          });
        }
      }
    }).then(function() {
      // $scope.status('Your item has been returned');
    }, function() {
      // $scope.status = 'Item not returned';
    });
  };

});

app.factory('profileFac', function($http) {
  return {
    getUser: function(user) {
      return $http({
        method: 'GET',
        url: '/api/getAllUserItem',
        params: {id:user}
      })
      .then(function (resp) {
        return resp.data;
      });
    }
  };
});
