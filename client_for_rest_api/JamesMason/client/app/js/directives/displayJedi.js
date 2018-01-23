'use strict';
module.exports = function(app) {
  app.directive('displayJedi', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/displayJedi.html',
      scope: {
        jediData: '='
      }
    };
  });
};
