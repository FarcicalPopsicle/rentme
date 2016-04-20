var app = angular.module('e-Commer.reviews', []);

app.directive('reviews', function() {
  return {
    templateUrl: 'app/itemReviews/itemReviews.html'
  };
});