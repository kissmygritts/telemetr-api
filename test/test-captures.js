// process.env.NODE_ENV = 'test';

const db = require('../db');

// require testing packages
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

const capture = {
  perm_id: 'testCapture1',
  cap_date: '2016-01-01',
  sex: 'male',
  age: 'adult',
  species: 'DBHS',
  notes: 'test animal entry',
  serial_num: 'testDevice1'
};

describe('CAPTURES', () => {
  describe('POST /captures', () => {
    it('it should POST a new device', (done) => {
      chai.request(server)
        .post('/devices')
        .send(capture)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          don();
        });
    });
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
        .get('/catpures/' + capture.perm_id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('success').eql(true);
          res.body.should.have.property('data');
        });
    });
  });
});
