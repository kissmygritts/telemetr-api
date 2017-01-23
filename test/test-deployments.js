/* eslint-env mocha */
const db = require('../db')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
chai.use(chaiHttp)

const device = {
  serial_num: 'collar2',
  frequency: 123.123,
  vendor: 'ATS - telonics',
  device_type: 'GPS',
  mfg_date: '2012-01-01',
  model: 'IRIDIUM'
}

const capture = {
  perm_id: 'testDeployments',
  cap_date: '2016-01-01',
  sex: 'male',
  age: 'adult',
  species: 'DBHS',
  notes: 'test animal entry',
  serial_num: 'collar2'
}

describe('DEPLOYMENTS', () => {
  before(() => {
    db.devices.post(device)
    .then(db.captures.post(capture))
  })

  // after(() => {
  //   db.devices.delete({ serial_num: 'collar2' })
  //   .then(db.captures.delete({ perm_id: 'testDeployments' }));
  //   // TODO: delete animals
  //   // TODO: delete deployment
  // });

  describe('GET /deployments', () => {
    it('it should GET all deployments', (done) => {
      chai.request(server)
        .get('/deployments')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          done()
        })
    })
  })

  describe('GET /deployments/perm_id', () => {
    it('it should GET one deployment by perm_id', (done) => {
      chai.request(server)
        .get('/deployments/' + capture.perm_id)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          done()
        })
    })
  })
})
