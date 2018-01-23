'use strict';
require('../app/js/client');
var angular = require('angular');
require('angular-mocks');
describe('Force Controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;
  beforeEach(angular.mock.module('forceApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));
  it('Should be able to make a controller.', () => {
    var controller = $ControllerConstructor('JediController', { $scope });
    expect(typeof controller).toBe('object'); // eslint-disable-line
    expect(Array.isArray($scope.lightJedi)).toBe(true); // eslint-disable-line
    expect(Array.isArray($scope.darkJedi)).toBe(true); // eslint-disable-line
    expect(typeof $scope.getAllLightJedi).toBe('function'); // eslint-disable-line
    expect(typeof $scope.getAllDarkJedi).toBe('function'); // eslint-disable-line
    expect(typeof $scope.getAllJedi).toBe('function'); // eslint-disable-line
  });
  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('JediController', { $scope });
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Should make a GET request to "/api/light".', () => {
      $httpBackend.expectGET('http://localhost:3000/api/light').respond(200, [{ name: 'Luke' }]);
      $scope.getAllLightJedi();
      $httpBackend.flush();
      expect($scope.lightJedi.length).toBe(1); // eslint-disable-line
      expect($scope.lightJedi[0].name).toBe('Luke'); // eslint-disable-line
    });
    it('Should make a GET request to "/api/dark".', () => {
      $httpBackend.expectGET('http://localhost:3000/api/dark').respond(200, [{ name: 'Vader' }]);
      $scope.getAllDarkJedi();
      $httpBackend.flush();
      expect($scope.darkJedi.length).toBe(1); // eslint-disable-line
      expect($scope.darkJedi[0].name).toBe('Vader'); // eslint-disable-line
    });
    it('Should make a POST request to "/api/light".', () => {
      var testJedi = { name: 'the response jedi' };
      $httpBackend.expectPOST('http://localhost:3000/api/light', { name: 'the sent jedi', force: 'Light' })
        .respond(200, testJedi);
      $httpBackend.expectGET('http://localhost:3000/api/light').respond(200, [testJedi]);
      $scope.newJedi = { name: 'the new jedi' };
      $scope.createLightJedi({ name: 'the sent jedi' });
      $httpBackend.flush();
      expect($scope.lightJedi.length).toBe(1); // eslint-disable-line
      expect($scope.newJedi).toBe(null); // eslint-disable-line
      expect($scope.lightJedi[0].name).toBe('the response jedi'); // eslint-disable-line
    });
    it('Should make a POST request to "/api/dark".', () => {
      var testJedi = { name: 'the response jedi' };
      $httpBackend.expectPOST('http://localhost:3000/api/dark', { name: 'the sent jedi', force: 'Dark' })
        .respond(200, testJedi);
      $httpBackend.expectGET('http://localhost:3000/api/dark').respond(200, [testJedi]);
      $scope.newJedi = { name: 'the new jedi' };
      $scope.createDarkJedi({ name: 'the sent jedi' });
      $httpBackend.flush();
      expect($scope.darkJedi.length).toBe(1); // eslint-disable-line
      expect($scope.newJedi).toBe(null); // eslint-disable-line
      expect($scope.darkJedi[0].name).toBe('the response jedi'); // eslint-disable-line
    });
    it('Should make an PUT request to "/api/light/:id".', () => {
      var testJedi = { name: 'JEDI', _id: 5 };
      $scope.lightJedi.push(testJedi);
      $httpBackend.expectPUT('http://localhost:3000/api/light/5', testJedi).respond(200);
      $httpBackend.expectGET('http://localhost:3000/api/light').respond(200, [testJedi]);
      $scope.updateLightJedi(testJedi);
      $httpBackend.flush();
      expect($scope.lightJedi[0].name).toBe('JEDI'); // eslint-disable-line
    });
    it('Should make an PUT request to "/api/dark/:id".', () => {
      var testJedi = { name: 'JEDI', _id: 5 };
      $scope.darkJedi.push(testJedi);
      $httpBackend.expectPUT('http://localhost:3000/api/dark/5', testJedi).respond(200);
      $httpBackend.expectGET('http://localhost:3000/api/dark').respond(200, [testJedi]);
      $scope.updateDarkJedi(testJedi);
      $httpBackend.flush();
      expect($scope.darkJedi[0].name).toBe('JEDI'); // eslint-disable-line
    });
    it('Should make a DELETE request to "/api/light/:id".', () => {
      var testJedi = { name: 'Dead Jedi', _id: 1 };
      $scope.lightJedi.push(testJedi);
      expect($scope.lightJedi.indexOf(testJedi)).not.toBe(-1); // eslint-disable-line
      $httpBackend.expectDELETE('http://localhost:3000/api/light/1').respond(200);
      $httpBackend.expectGET('http://localhost:3000/api/light').respond(200, [testJedi]);
      $scope.deleteLightJedi(testJedi);
      $httpBackend.flush();
      expect($scope.lightJedi.indexOf(testJedi)).toBe(-1); // eslint-disable-line
    });
    it('Should make a DELETE request to "/api/dark/:id".', () => {
      var testJedi = { name: 'Dead Jedi', _id: 1 };
      $scope.darkJedi.push(testJedi);
      expect($scope.darkJedi.indexOf(testJedi)).not.toBe(-1); // eslint-disable-line
      $httpBackend.expectDELETE('http://localhost:3000/api/dark/1').respond(200);
      $httpBackend.expectGET('http://localhost:3000/api/dark').respond(200, [testJedi]);
      $scope.deleteDarkJedi(testJedi);
      $httpBackend.flush();
      expect($scope.darkJedi.indexOf(testJedi)).toBe(-1); // eslint-disable-line
    });
  });
});
