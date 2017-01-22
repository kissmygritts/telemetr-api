// process.env.NODE_ENV = 'test';

const db = require('../db');

// require testing packages
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

const capture = {
  perm_id: 'testDeviceCapture',
  cap_date: '2016-01-01',
  sex: 'male',
  age: 'adult',
  species: 'DBHS',
  notes: 'test animal entry',
  serial_num: 'collar1'
};

describe('CAPTURES', () => {
  before(() => {
    db.devices.post({
      serial_num: "collar1",
      frequency: 123.123,
      vendor: "ATS - telonics",
      device_type: "GPS",
      mfg_date: "2012-01-01",
      model: "IRIDIUM"
    });
  });

  after(() => {
    db.devices.delete({ serial_num: "testDeviceCapture" });
  });

  describe('POST /captures', () => {
    it('it should POST a new capture', (done) => {
      chai.request(server)
        .post('/captures')
        .send(capture)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });

    /* it should also enter a new animal */
    it('it should also insert a new animal', (done) => {
      chai.request(server)
        .get('/animals/' + capture.perm_id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });

    // TODO: it should also insert into deployments
  });

  describe('GET /captures', () => {
    it('it should GET all the captures', (done) => {
      chai.request(server)
        .get('/captures')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  // test /captures/:perm_id
  describe('GET /captures/:perm_id', () => {
    it('it should GET capture by perm_id', (done) => {
      chai.request(server)
        .get('/captures/' + capture.perm_id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  /* delete a capture by id */
  describe('DELETE /captures/:perm_id', () => {
    it('it should DELETE capture by perm_id', (done) => {
      chai.request(server)
        .delete('/captures/' + capture.perm_id)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.a.property('success').eql(true);
          done();
        });
    });

    // TODO: DELETE should also delete Animal
    // TODO: DELETE should also delete Deployment
  });
});
