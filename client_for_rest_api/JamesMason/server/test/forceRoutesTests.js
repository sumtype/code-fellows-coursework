'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/force_balancer_test';
require(__dirname + '/../server');
const Jedi = require(__dirname + '/../lib/jedi');

describe('Force Balancer REST API', function() {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => done());
  });
  it('Should be able to retrieve all the Jedi.', (done) => {
    chai.request('localhost:3000').get('/api/balance').end((err, res) => {
      expect(err).to.equal(null);
      expect(typeof res.body).to.equal('object');
      done();
    });
  });
  it('Should be able to retrieve all the Light Jedi.', (done) => {
    chai.request('localhost:3000').get('/api/light').end((err, res) => {
      expect(err).to.equal(null);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });
  it('Should be able to retrieve all the Dark Jedi.', (done) => {
    chai.request('localhost:3000').get('/api/dark').end((err, res) => {
      expect(err).to.equal(null);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });
  it('Should be able to create a civilian Jedi with a POST request.', (done) => {
    chai.request('localhost:3000').post('/api/light').end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.equal('Civilian');
      expect(res.body).to.have.property('_id');
      chai.request('localhost:3000').post('/api/dark').end((err2, res2) => {
        expect(err2).to.equal(null);
        expect(res2).to.have.status(200);
        expect(res2.body.name).to.equal('Civilian');
        expect(res2.body).to.have.property('_id');
        done();
      });
    });
  });
  it('Should be able to create a Light Jedi with a POST request.', (done) => {
    chai.request('localhost:3000').post('/api/light').send({ force: 'Light' }).end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.force).to.equal('Light');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
  it('Should be able to create a Dark Jedi with a POST request.', (done) => {
    chai.request('localhost:3000').post('/api/dark').send({ force: 'Dark' }).end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body.force).to.equal('Dark');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
  describe('REST request tests that require a Jedi to already be in the database.', () => {
    beforeEach((done) => {
      Jedi.create({ force: 'Neutral' }, (err, data) => {
        if (err) return err;
        this.testJedi = data;
        done();
      });
    });
    it('Should be able to update a Jedi\'s information via the light route.', (done) => {
      chai.request('localhost:3000').put('/api/light/' + this.testJedi._id)
        .send({ name: 'Obi-Wan' }).end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Successfully updated the Jedi with an id equal to ' + this.testJedi._id);
          done();
        });
    });
    it('Should be able to delete a Jedi\'s information via the light route.', (done) => {
      chai.request('localhost:3000').delete('/api/light/' + this.testJedi._id).end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Successfully deleted the Jedi with an id equal to ' + this.testJedi._id);
        done();
      });
    });
    it('Should be able to update a Jedi\'s information via the dark route.', (done) => {
      chai.request('localhost:3000').put('/api/dark/' + this.testJedi._id)
        .send({ name: 'Darth Vader' }).end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Successfully updated the Jedi with an id equal to ' + this.testJedi._id);
          done();
        });
    });
    it('Should be able to delete a Jedi\'s information via the dark route.', (done) => {
      chai.request('localhost:3000').delete('/api/dark/' + this.testJedi._id).end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Successfully deleted the Jedi with an id equal to ' + this.testJedi._id);
        done();
      });
    });
  });
  describe('Balance Battle Tests', () => {
    beforeEach((done) => {
      Jedi.create({ force: 'Dark' }, (err) => {
        if (err) return err;
        Jedi.create({ force: 'Light' }, (err) => {
          if (err) return err;
          Jedi.create({ force: 'Neutral' }, (err) => {
            if (err) return err;
            done();
          });
        });
      });
    });
    it('Check 1: Should return an appropriate string response when a GET request is made to \'/api/balance/:numberOfBattles\'.  This response should contain data corresponding to the number of battles specified in the URL.', (done) => { // eslint-disable-line
      chai.request('localhost:3000').get('/api/balance/17').end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text.indexOf('17')).to.be.above(-1);
        expect(res.text.indexOf('light side')).to.be.above(-1);
        expect(res.text.indexOf('dark side')).to.be.above(-1);
        expect(res.text.indexOf('civilian')).to.be.above(-1);
        expect(res.text.indexOf('these')).to.be.above(-1);
        done();
      });
    });
    it('Check 2: Should return an appropriate string response when a GET request is made to \'/api/balance/:numberOfBattles\'.  This response should contain data corresponding to the number of battles specified in the URL.', (done) => { // eslint-disable-line
      chai.request('localhost:3000').get('/api/balance/-10').end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('<div>The universe is at peace.</div>');
        done();
      });
    });
  });
});
