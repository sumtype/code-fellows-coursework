var chai = require('chai'), expect = require('chai').expect, chaiHttp = require('chai-http'), fs = require('fs'), request = chai.request, Router = require(__dirname + '/../lib/router.js'), headMessage = require(__dirname + '/../lib/headMessage.js'), http = require('http');
chai.use(chaiHttp);
describe('Router()', function() {
  before(function(done) {
    this.router = new Router();
    done();
  });
  it('Should create a router object with routes when the constructor method is called.', function(done) {
    expect(this.router.routes.hasOwnProperty('GET')).to.eql(true);
    expect(typeof this.router.routes['GET']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('POST')).to.eql(true);
    expect(typeof this.router.routes['POST']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('PUT')).to.eql(true);
    expect(typeof this.router.routes['PUT']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('PATCH')).to.eql(true);
    expect(typeof this.router.routes['PATCH']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('DELETE')).to.eql(true);
    expect(typeof this.router.routes['DELETE']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('FourOhFour')).to.eql(true);
    expect(typeof this.router.routes['FourOhFour']).to.eql('function');
    done();
  });
  it('Should define a callback function for an http GET request and url that returns an expected value.', function(done) {
    var date = Date.now().toString();
    this.router.get('/testget', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      return res.end();
    });
    expect(typeof this.router.routes['GET']['/testget']).to.eql('function');
    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .get('/testget')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(date);
        server.close();
        done();
      });
  });
  it('Should define a callback function for an http POST request and url that returns an expected value.', function(done) {
    var date = Date.now().toString();
    this.router.post('/testpost', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      return res.end();
    });
    expect(typeof this.router.routes['POST']['/testpost']).to.eql('function');
    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .post('/testpost')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(date);
        server.close();
        done();
      });
  });
  it('Should define a callback function for an http PUT request and url that returns an expected value.', function(done) {
    var date = Date.now().toString();
    this.router.put('/testput', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      return res.end();
    });
    expect(typeof this.router.routes['PUT']['/testput']).to.eql('function');
    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .put('/testput')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(date);
        server.close();
        done();
      });
  });
  it('Should define a callback function for an http PATCH request and url that returns an expected value.', function(done) {
    var date = Date.now().toString();
    this.router.patch('/testpatch', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      return res.end();
    });
    expect(typeof this.router.routes['PATCH']['/testpatch']).to.eql('function');
    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .patch('/testpatch')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(date);
        server.close();
        done();
      });
  });
  it('Should define a callback function for an http DELETE request and url that returns an expected value.', function(done) {
    var date = Date.now().toString();
    this.router.delete('/testdelete', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      return res.end();
    });
    expect(typeof this.router.routes['DELETE']['/testdelete']).to.eql('function');
    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .delete('/testdelete')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(date);
        server.close();
        done();
      });
  });
  it('Should return a 404 message when a server using the Router object is requested a url which does not exist.', function(done) {
    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .get('/test1242516')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('Page not found');
        server.close();
        done();
      });
  });
});
