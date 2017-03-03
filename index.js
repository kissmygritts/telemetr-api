'use strict'
const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const qs = require('qs')
const app = Express()
const db = require('./db')  // As long as the routes use the db logic
// I don't need to require the database here

// QUESTION: check body parser requirements for an API??
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// // set up routes
// TODO: move all route reqs into (./routes/index.js)
const deployments = require('./routes/deployments')
const animals = require('./routes/animals')
const devices = require('./routes/devices')
const captures = require('./routes/captures')
const relocations = require('./routes/relocations')
const validity = require('./routes/validity')
const trajectories = require('./routes/trajectories')
const studies = require('./routes/studies')
const sql = require('./routes/sql')

app.use('/deployments', deployments)
app.use('/animals', animals)
app.use('/devices', devices)
app.use('/captures', captures)
app.use('/relocations', relocations)
app.use('/validity', validity)
app.use('/trajectories', trajectories)
app.use('/studies', studies)
app.use('/sql', sql)

app.get('/migrations/up', (req, res) => {
  db.migrations.up()
  .then(() => res.status(200).json({ success: true, msg: 'mig up' }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

app.get('/migrations/down', (req, res) => {
  db.migrations.down()
  .then(() => res.status(200).json({ success: true, msg: 'mig down' }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

app.get('/qs', (req, res) => {
  let qg = req.query
  if (qg !== {}) {
    console.log('no query string')
  } else {
    console.log(req.query)
  }

  res.status(200).json(req.query)
})

app.listen(8081, () => {
  console.log('API listening on port 8081')
})

module.exports = app
