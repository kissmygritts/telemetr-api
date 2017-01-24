/* eslint-env mocha */
const db = require('../db')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
chai.use(chaiHttp)

const capture = {
  perm_id: 'test',
  cap_date: '2016-01-01',
  sex: 'male',
  age: 'adult',
  species: 'DBHS',
  notes: 'test animal entry',
  serial_num: 'collar1'
}

describe('CAPTURES', () => {
  beforeEach(() => db.migrations.up())
  afterEach(() => db.migrations.down())

  describe('POST /captures', () => {
    it('it should POST a new capture', (done) => {
      chai.request(server)
        .post('/captures')
        .send(capture)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          done()
        })
    })
  })

  describe('GET /captures', () => {
    it('it should GET all the captures', (done) => {
      chai.request(server)
        .get('/captures')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.a.property('success').eql(true)
          res.body.should.have.property('data')
          res.body.data.should.be.a('array')
          done()
        })
    })
  })

  // test /captures/:perm_id
  describe('GET /captures/:perm_id', () => {
    it('it should GET capture by perm_id', (done) => {
      chai.request(server)
        .get('/captures/testCapture')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          res.body.data[0].should.have.property('perm_id')
          res.body.data[0].should.have.property('species')
          res.body.data[0].should.have.property('age')
          res.body.data[0].should.have.property('sex')
          res.body.data[0].should.have.property('serial_num')
          res.body.data[0].should.have.property('animal_id')
          res.body.data[0].should.have.property('device_id')
          res.body.data[0].should.have.property('deployment_id')
          done()
        })
    })
  })

  /* delete a capture by id */
  describe('DELETE /captures/:perm_id', () => {
    it('it should DELETE capture by perm_id', (done) => {
      chai.request(server)
        .delete('/captures/collar2')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.a('object')
          res.body.should.have.a.property('success').eql(true)
          done()
        })
    })
  })
})
