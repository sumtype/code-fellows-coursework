'use strict';
module.exports = function(app) {
  app.directive('jediForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/jediForm.html',
      scope: {
        buttonText: '@',
        newJedi: '=',
        save: '&'
      }
    };
  });
};
