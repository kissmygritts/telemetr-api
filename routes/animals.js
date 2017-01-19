const Express = require('express');
const router = Express.Router();
const db = require('../db');

// // GET all animals
// router.get('/', (req, res) => {
//   db.any('SELECT * FROM animals')
//   .then(data => res.status(200).json({ success: true, data: data }))
//   .catch(err => res.status(400).json({ success: false, data: err }));
// });
//
// // GET one animal by perm_id
// router.get('/:perm_id', (req, res) => {
//   db.any('SELECT * FROM animals WHERE perm_id = $(perm_id)', req.params)
//   .then(data => res.status(200).json({ success: true, data: data }))
//   .catch(err => res.status(400).json({ success: false, data: err }));
// });
//
// module.exports = router;

router.get('/', (req, res) => {
  db.animals.getAll()
  .then(data => res.status(200).json(data))
  .cathc(err => res.status(400).json(err));
});

module.exports = router;
