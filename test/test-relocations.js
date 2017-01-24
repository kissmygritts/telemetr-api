/* eslint-env mocha */
const db = require('../db')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
chai.use(chaiHttp)

describe('RELOCATIONS', () => {
  beforeEach(() => db.migrations.up())
  afterEach(() => db.migrations.down())

  describe('GET /relocations', () => {
    it('it should GET all relocations', (done) => {
      chai.request(server)
        .get('/relocations')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          res.body.data.should.be.a('array').length.above(0)
          done()
        })
    })
  })

  describe('GET /relocations/:perm_id', () => {
    it('it should GET all relocations for :perm_id', (done) => {
      chai.request(server)
        .get('/relocations/testCapture')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          res.body.data.should.be.a('array').length.above(0)
          done()
        })
    })
  })

})
