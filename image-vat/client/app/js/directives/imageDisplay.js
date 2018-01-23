'use strict';
module.exports = function(app) {
  app.directive('imageDisplay', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/imageDisplay.html',
      scope: {
        imageData: '='
      }
    };
  });
};
