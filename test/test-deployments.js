/* eslint-env mocha */
const db = require('../db')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
chai.use(chaiHttp)

describe('DEPLOYMENTS', () => {
  beforeEach(() => db.migrations.up())
  afterEach(() => db.migrations.down())

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
        .get('/deployments/testCapture')
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
