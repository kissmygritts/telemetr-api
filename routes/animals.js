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
  // TODO: data validation for aniamls post
  db.animals.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// delete an animal by perm_id
router.delete('/:perm_id', (req, res) => {
  // TODO: should also delete the deployment
  db.captures.delete(req.params)
  .then(() => res.status(200).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// TODO: edit route

// get deployments by animal's perm_id
router.get('/:perm_id/deployments', (req, res) => {
  db.deployments.show(`WHERE perm_id = '${req.params.perm_id}'`)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

// get all relocations by animal's perm_id
router.get('/:perm_id/relocations', (req, res) => {
  db.relocations.show(req.params)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
