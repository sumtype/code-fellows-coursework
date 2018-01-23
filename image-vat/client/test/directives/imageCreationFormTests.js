'use strict';
const angular = require('angular');
const template = require('../../app/templates/imageCreationForm.html');

describe('Image Creation Form Directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;
  beforeEach(angular.mock.module('imageVatApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));
  it('Should load the directive.', function() {
    $httpBackend.expectGET('/templates/imageCreationForm.html').respond(200, template);
    var element = $compile('<image-creation-form data-new-image="{}"></image-creation-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('Add Image to Vat'); // eslint-disable-line
  });
  it('Should be able to call a passed save function.', function() {
    var scope = $rootScope.$new();
    $httpBackend.expectGET('/templates/imageCreationForm.html').respond(200, template);
    var called = false;
    scope.newImage = { url: 'http://test.com/test.jpg', description: 'Test image description.' };
    scope.testSave = function(input) {
      expect(input.url).toBe('http://test.com/image.jpg'); // eslint-disable-line
      expect(input.description).toBe('Image description.'); // eslint-disable-line
      scope.newImage = input;
      called = true;
    };
    var element = $compile('<image-creation-form data-new-image="{ url: \'http://test.com/newImage.jpg\', description: \'New Image Description\' }" data-create=testSave></image-creation-form>')(scope); // eslint-disable-line
    $httpBackend.flush();
    $rootScope.$digest();
    element.isolateScope().create(scope)({ url: 'http://test.com/image.jpg', description: 'Image description.' });
    expect(called).toBe(true); // eslint-disable-line
    expect(scope.newImage.url).toBe('http://test.com/image.jpg'); // eslint-disable-line
    expect(scope.newImage.description).toBe('Image description.'); // eslint-disable-line
  });
});
