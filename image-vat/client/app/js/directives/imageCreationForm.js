'use strict';
module.exports = function(app) {
  app.directive('imageCreationForm', function() {
    return {
      restrict: 'EAC',
      templateUrl: '/templates/imageCreationForm.html',
      scope: {
        newImage: '=',
        create: '&'
      }
    };
  });
};
