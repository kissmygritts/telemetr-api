const Express = require('express');
const router = Express.Router();
const db = require('../db');

router.get('/relocations', (req, res) => {
  db.relocations.validity()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, err: err }));
});

module.exports = router;
