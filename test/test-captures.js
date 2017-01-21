// process.env.NODE_ENV = 'test';

const db = require('../db');

// require testing packages
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

describe('CAPTURES', () => {
  describe('GET /captures', () => {
    it('it should GET all the books', (done) => {
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
});
