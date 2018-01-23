'use strict';
const angular = require('angular');
const template = require('../../app/templates/imageDisplay.html');

describe('Image Display Directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;
  beforeEach(angular.mock.module('imageVatApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));
  it('Should load the directive with the appropriate parameters.', function() {
    $httpBackend.expectGET('/templates/imageDisplay.html').respond(200, template);
    var element = $compile('<image-display data-image-data="{ url: \'http://test.com/test.jpg\', description: \'Test image description.\' }"></image-display>')($rootScope); // eslint-disable-line
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('http://test.com/test.jpg'); // eslint-disable-line
    expect(element.html()).toContain('Test image description.'); // eslint-disable-line
  });
});
