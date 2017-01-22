// process.env.NODE_ENV = 'test';

const db = require('../db');

// require testing packages
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

const device = {
  serial_num: "testDevice1",
  frequency: 123.123,
  vendor: "ATS - telonics",
  device_type: "GPS",
  mfg_date: "2012-01-01",
  model: "IRIDIUM"
}

describe('DEVICES', () => {
  // test POST route
  describe('POST /devices', () => {
    it('it should POST a new device', (done) => {
      chai.request(server)
        .post('/devices')
        .send(device)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  // test the /devices GET route
  describe('GET /devices', () => {
    it('it should GET all the devices', (done) => {
      chai.request(server)
        .get('/devices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  // test /devices/:id
  describe('GET /devices/:id', () => {
    it('it should GET a device by id', (done) => {
      chai.request(server)
        .get('/devices/' + device.serial_num)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  // DELETE ROUTE
  describe('DELETE /devices', () => {
    it('it should DELETE the proper device', (done) => {
      chai.request(server)
        .delete('/devices/' + device.serial_num)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          done();
        });
    });
  });
});
