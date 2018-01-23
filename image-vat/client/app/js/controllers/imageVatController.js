'use strict';
module.exports = exports = function(app) {
  app.controller('imageVatController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    $scope.images = [];
    var imagesResource = Resource('images');
    $scope.getImageVat = function() {
      imagesResource.getAll(function(err, res) {
        if (err) console.log(err);
        $scope.images = res;
      });
    };
    $scope.createImage = function(image) {
      $scope.images.push(image);
      imagesResource.create(image, function(err, res) {
        if (err) console.log(err);
        $scope.images.splice($scope.images.indexOf(image), 1, res);
        $scope.newImage = null;
      });
    };
    $scope.createImageAndUpdateDisplay = function(image) {
      $scope.createImage(image);
      $scope.getImageVat();
    };
  }]);
};
