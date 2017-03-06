const Express = require('express')
const router = Express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.species.all()
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:species', (req, res) => {
  db.species.show(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:species/deployments', (req, res) => {
  db.species.deployments(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:species/relocations', (req, res) => {
  db.species.relocs(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
