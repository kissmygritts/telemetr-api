const Express = require('express')
const router = Express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.studies.all()
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:id', (req, res) => {
  db.studies.show(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:id/deployments', (req, res) => {
  db.studies.deployments(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:id/relocations', (req, res) => {
  db.studies.relocs(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
