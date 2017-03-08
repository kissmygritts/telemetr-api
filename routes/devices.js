const Express = require('express')
const _ = require('lodash')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp

// get all devices
router.get('/', (req, res) => {
  db.devices.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get a device by the serial number
router.get('/:serial_num', (req, res) => {
  db.devices.show(req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// create a new device
router.post('/', (req, res) => {
  db.devices.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// delete a device by serial number
router.delete('/:serial_num', (req, res) => {
  // TODO: when a device is deleted and the device has deployments this should throw a warning
  db.devices.delete(req.params)
  .then(() => res.status(200).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// update an existing device by serial number
router.put('/:serial_num', (req, res) => {
  let s = pgp.helpers.sets(req.body)

  db.devices.edit([s, req.params.serial_num])
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get all deployments of a device by serial number
router.get('/:serial_num/deployments', (req, res) => {
  let where
  // check for active in query string
  if (Object.keys(req.query).length !== 0 && req.query.active === '') {
    // FIXME: use pgp.helpers.format instead of ES6 template strings
    where = `WHERE serial_num = '${req.params.serial_num}' AND outservice IS NULL`
  } else {
    where = `WHERE serial_num = '${req.params.serial_num}'`
  }

  db.deployments.show(where)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
