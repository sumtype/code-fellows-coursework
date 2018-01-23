var chai = require('chai'), expect = require('chai').expect, chaiHttp = require('chai-http'), fs = require('fs');
chai.use(chaiHttp);
var request = chai.request;
describe('headMessage(res, status, ctype, bodyMsg)', () => {
  before(function(done) {
    this.server = require(__dirname + '/headMessageTestsTestServer');
    done();
  });
  after(function(done) {
    this.server.close();
    done();
  });
  it('Should return a response in plain text.', (done) => {
    request('localhost:3000')
      .get('/test1')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('test stuff 1 ');
        done();
      });
  });
  it('Should return a response in JSON.', (done) => {
    request('localhost:3000')
      .get('/test2')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"msg":"test stuff 2"}');
        done();
      });
  });
  it('Should return a 404 response in plain text.', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('Page not found');
        done();
      });
  });
});
