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

// post new species
router.post('/', (req, res) => {
  db.species.post(req.body)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// edit existing species by species code
router.put('/:species', (req, res) => {
  db.species.edit({
    id: req.params.species,
    common_name: req.body.common_name || null,
    species_code: req.body.species_code || null,
    genus: req.body.genus || null,
    species: req.body.species || null,
    sub_species: req.body.sub_species || null,
    attributes: req.body.attributes || null
  })
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.delete('/:species', (req, res) => {
  db.species.delete(req.params)
  .then(data => res.status(200).json({ success: true, length: data.length, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
