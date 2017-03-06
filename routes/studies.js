const Express = require('express')
const router = Express.Router()
const db = require('../db')

// get all studies
router.get('/', (req, res) => {
  db.studies.all()
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get study by id
router.get('/:id', (req, res) => {
  db.studies.show(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get all deployments by study id
router.get('/:id/deployments', (req, res) => {
  db.studies.deployments(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get all relocations by study id
router.get('/:id/relocations', (req, res) => {
  db.studies.relocs(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// post new study
router.post('/', (req, res) => {
  db.studies.post(req.body)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// edit existing records by id
router.put('/:id', (req, res) => {
  db.studies.edit({
    study_name: req.body.study_name,
    attributes: req.body.attributes,
    id: req.params.id
  })
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.delete('/:id', (req, res) => {
  db.studies.delete(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
