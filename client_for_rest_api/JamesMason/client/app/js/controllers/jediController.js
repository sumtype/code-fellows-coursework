'use strict';

module.exports = exports = function(app) {
  app.controller('JediController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    // Light Jedi Functions
    $scope.lightJedi = [];
    var lightREST = Resource('light');
    $scope.getAllLightJedi = function() {
      lightREST.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.lightJedi = res;
      });
    };
    $scope.createLightJedi = function(jedi) {
      jedi.force = 'Light';
      $scope.lightJedi.push(jedi);
      lightREST.create(jedi, function(err, res) {
        if (err) return console.log(err);
        $scope.lightJedi.splice($scope.lightJedi.indexOf(jedi), 1, res);
        $scope.newJedi = null;
        $scope.getAllLightJedi();
      });
    };
    $scope.deleteLightJedi = function(jedi) {
      lightREST.delete(jedi, function(err) {
        if (err) return console.log(err);
        $scope.lightJedi.splice($scope.lightJedi.indexOf(jedi), 1);
        $scope.getAllLightJedi();
      });
    };
    $scope.updateLightJedi = function(jedi) {
      lightREST.update(jedi, function(err) {
        if (err) return console.log(err);
        $scope.getAllLightJedi();
      });
    };
    // Dark Jedi Functions
    $scope.darkJedi = [];
    var darkREST = Resource('dark');
    $scope.getAllDarkJedi = function() {
      darkREST.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.darkJedi = res;
      });
    };
    $scope.createDarkJedi = function(jedi) {
      jedi.force = 'Dark';
      $scope.darkJedi.push(jedi);
      darkREST.create(jedi, function(err, res) {
        if (err) return console.log(err);
        $scope.darkJedi.splice($scope.darkJedi.indexOf(jedi), 1, res);
        $scope.newJedi = null;
        $scope.getAllDarkJedi();
      });
    };
    $scope.deleteDarkJedi = function(jedi) {
      darkREST.delete(jedi, function(err) {
        if (err) return console.log(err);
        $scope.darkJedi.splice($scope.darkJedi.indexOf(jedi), 1);
        $scope.getAllDarkJedi();
      });
    };
    $scope.updateDarkJedi = function(jedi) {
      darkREST.update(jedi, function(err) {
        if (err) return console.log(err);
        $scope.getAllDarkJedi();
      });
    };
    // General Jedi Functions
    $scope.getAllJedi = function() {
      $scope.getAllLightJedi();
      $scope.getAllDarkJedi();
    };
    // $scope.getAllJedi();
  }]);
};
