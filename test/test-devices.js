/* eslint-env mocha */
const db = require('../db')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
chai.use(chaiHttp)

const device = {
  serial_num: 'testDevice1',
  frequency: 123.123,
  vendor: 'ATS - telonics',
  device_type: 'GPS',
  mfg_date: '2012-01-01',
  model: 'IRIDIUM'
}

describe('DEVICES', () => {

  beforeEach(() => db.migrations.up())
  afterEach(() => db.migrations.down())

  // test POST route
  describe('POST /devices', () => {
    it('it should POST a new device', (done) => {
      chai.request(server)
        .post('/devices')
        .send(device)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          done()
        })
    })
  })

  // test the /devices GET route
  describe('GET /devices', () => {
    it('it should GET all the devices', (done) => {
      chai.request(server)
        .get('/devices')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          done()
        })
    })
  })

  // test /devices/:id
  describe('GET /devices/:serial_num', () => {
    it('it should GET a device by serial_num', (done) => {
      chai.request(server)
        .get('/devices/collar2')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data')
          done()
        })
    })
  })

  // DELETE ROUTE
  describe('DELETE /devices/:serial_num', () => {
    it('it should DELETE device by serial number', (done) => {
      chai.request(server)
        .delete('/devices/collar3')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('success').eql(true)
          done()
        })
    })
  })
})
