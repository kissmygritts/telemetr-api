const Express = require('express')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp

// get all animals
router.get('/', (req, res) => {
  let q = req.query
  let where = ''
  let s = []

  // loop over q (req.query) to grab querystring params to
  // dynamically generate the sql where clause
  if (Object.keys(q).length !== 0) {
    console.log(q[0])
    for (let x in q) {
      s.push(pgp.as.format(`${x} IN ($(${x}:csv))`, q))
    }
    where = s.reduce((prev, curr) => prev + ' AND ' + curr)
  } else {
    where = true
  }

  db.animals.all(where)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get animal by perm_id
router.get('/:perm_id', (req, res) => {
  db.animals.show(req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// post to animals table
router.post('/', (req, res) => {
  // FIXME: this needs to be by id rather than perm_id
  // TODO: data validation for aniamls post
  db.animals.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// delete an animal by perm_id
router.delete('/:id', (req, res) => {
  db.animals.delete(req.params)
  .then(() => res.status(200).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.put('/:id', (req, res) => {
  db.animals.edit({
    id: req.params.id,
    perm_id: req.body.perm_id || null,
    species_id: req.body.species_id || null,
    sex: req.body.sex || null,
    age: req.body.age || null,
    study_id: req.body.study_id || null,
    fate: req.body.fate || null,
    fate_date: req.body.fate_date || null,
    notes: req.body.notes || null,
    attributes: req.body.attributes || null
  })
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get deployments by animal's perm_id
router.get('/:perm_id/deployments', (req, res) => {
  // TODO: get active deployments
  db.deployments.show(`WHERE perm_id = '${req.params.perm_id}'`)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get all relocations by animal's perm_id
router.get('/:perm_id/relocations', (req, res) => {
  db.animals.relocs(req.params)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// TODO: /animals/:perm_id/relocs/:from-:to

module.exports = router
