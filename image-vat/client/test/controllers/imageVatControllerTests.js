'use strict';
var angular = require('angular');
describe('Image Vat Controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;
  beforeEach(angular.mock.module('imageVatApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));
  it('Should be able to make a controller.', () => {
    var controller = $ControllerConstructor('imageVatController', { $scope });
    expect(typeof controller).toBe('object'); // eslint-disable-line
    expect(Array.isArray($scope.images)).toBe(true); // eslint-disable-line
    expect(typeof $scope.getImageVat).toBe('function'); // eslint-disable-line
    expect(typeof $scope.createImage).toBe('function'); // eslint-disable-line
  });
  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('imageVatController', { $scope });
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Should make a GET request to "/api/images".', () => {
      $httpBackend.when('GET', 'http://localhost:5000/api/images')
        .respond(200, [{ url: 'http://test.com/test.jpg', description: 'Test image description.' }]);
      $scope.getImageVat();
      $httpBackend.flush();
      expect($scope.images.length).toBe(1); // eslint-disable-line
      expect($scope.images[0].url).toBe('http://test.com/test.jpg'); // eslint-disable-line
      expect($scope.images[0].description).toBe('Test image description.'); // eslint-disable-line
    });
    it('Should make a POST request to "/api/images".', () => {
      var testImage = { url: 'http://test.com/image.jpg', description: 'Image description.' };
      $httpBackend.when('POST', 'http://localhost:5000/api/images', { url: 'http://test.com/test.jpg', description: 'Test image description.' })
        .respond(200, testImage);
      $scope.newImage = { url: 'http://test.com/newImage.jpg', description: 'New image description.' };
      $scope.createImage({ url: 'http://test.com/test.jpg', description: 'Test image description.' });
      $httpBackend.flush();
      expect($scope.images.length).toBe(1); // eslint-disable-line
      expect($scope.newImage).toBe(null); // eslint-disable-line
      expect($scope.images[0].url).toBe('http://test.com/image.jpg'); // eslint-disable-line
      expect($scope.images[0].description).toBe('Image description.'); // eslint-disable-line
    });
  });
});
