'use strict';
var success = function(cb) {
  return function(res) {
    console.log(res);
    cb(null, res.data);
  };
};

var failure = function(cb) {
  return function(res) {
    console.log(res);
    cb(res);
  };
};

module.exports = exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(resource) {
      this.resource = resource;
    };
    Resource.prototype.getAll = function(cb) {
      $http.get('http://localhost:3000/api/' + this.resource).then(success(cb), failure(cb));
    };
    Resource.prototype.create = function(data, cb) {
      $http.post('http://localhost:3000/api/' + this.resource, data).then(success(cb), failure(cb));
    };
    Resource.prototype.update = function(data, cb) {
      $http.put('http://localhost:3000/api/' + this.resource + '/' + data._id, data).then(success(cb), failure(cb));
    };
    Resource.prototype.delete = function(data, cb) {
      $http.delete('http://localhost:3000/api/' + this.resource + '/' + data._id).then(success(cb), failure(cb));
    };
    return function(resource) {
      return new Resource(resource);
    };
  }]);
};
