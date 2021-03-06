const Express = require('express')
const router = Express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  let q = req.query.q
  console.log(q)
  db.any(q)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

module.exports = router
