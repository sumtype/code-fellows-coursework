'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/test_vat';
const path = require('path');
require(path.join(__dirname, '..', 'server.js'));

describe('Images REST API', function() {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => done());
  });
  it('Should be able to retrieve all the images in the vat.', (done) => {
    chai.request('localhost:5000').get('/api/images').end((err, res) => {
      expect(err).to.equal(null);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });
  it('Should be able to create an image with a POST request.', (done) => {
    chai.request('localhost:5000').post('/api/images')
      .send({ url: 'http://test.com/test.jpg', description: 'A test image.' }).end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body.url).to.equal('http://test.com/test.jpg');
        expect(res.body.description).to.equal('A test image.');
        expect(res.body).to.have.property('_id');
        done();
    });
  });
});
