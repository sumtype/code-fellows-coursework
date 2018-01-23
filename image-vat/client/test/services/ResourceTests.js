'use strict';
var angular = require('angular');

describe('Resource Service', function() {
  beforeEach(angular.mock.module('imageVatApp'));
  var TestResource;
  var TestResourceConstructor;
  beforeEach(angular.mock.inject(function(Resource) {
    TestResource = Resource('testRoute');
    TestResourceConstructor = Resource;
  }));
  it('Should be a service and have appropriate properties based on arguments provided to it\'s constructor.', function() {
    expect(typeof TestResourceConstructor).toBe('function'); // eslint-disable-line
    expect(TestResource.resource).toBe('testRoute'); // eslint-disable-line
    expect(typeof TestResource.getAll).toBe('function'); // eslint-disable-line
    expect(typeof TestResource.create).toBe('function'); // eslint-disable-line
  });
});
