const Express = require('express');
const _ = require('lodash');
const router = Express.Router();
const db = require('../db');

// GET lall captures
router.get('/', (req, res) => {
  db.any('SELECT * FROM captures')
    .then(data => res.status(200).json({ success: true, data: data }))
    .catch(err => res.status(400).json({ success: false, data: err }));
});

// GET captures by perm_id
router.get('/:perm_id', (req, res) => {
  db.any('SELECT * FROM captures WHERE perm_id = $(perm_id)', req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, data: err }));
});

// router.get('/:perm_id', (req, res) => {
//   db.any('SELECT * FROM captures WHERE perm_id = $1', req.params.perm_id)
//     .then(data => res.status(200).json({ success: true, data: data}))
//     .catch(err => res.status(400).json({ success: false, data: err }));
// });

router.get('/test', (req, res) => {
  db.task(t => {
    return t.batch([
      t.any('SELECT * FROM captures WHERE perm_id = \'F09\''),
      t.any('SELECT * FROM animals WHERE perm_id = \'MD10\'')
    ]);
  })
    .then(data => {
      console.log(data)
      res.status(200).json({ data0: data[0], ld0: data[0].length, data1: data[1], ld1:data[1].length })
    })
    .catch(err => res.status(400).json(err));
})

router.post('/', (req, res) => {
  let rb = req.body;
  let rtn = [];
  let success = true;
  let httpCode = 500;

  db.task(t => {
    return t.batch([
      t.any('SELECT * FROM captures WHERE perm_id = ${perm_id}', rb),
      t.any('SELECT * FROM devices WHERE serial_num = ${serial_num}', rb)
    ])
    .then(data => {
      // add checks
      if (data[0].length != 0) {
        success = false;
        rtn.push({
          message: rb.perm_id + ' already exists in the database. An animal can\'t have more tan one capture.',
          data: data[0]
        })
      }
      if (data[1].length == 0) {
        success = false;
        rtn.push({
          message: 'Device ' + rb.serial_num + ' isn\'t entered in the database. Enter the device first.'
        })
      }
      if (success) {
        httpCode = 201;
        return t.one(
          'INSERT INTO captures ' +
            '(perm_id, cap_date, sex, age, species, notes, serial_num) ' +
          'VALUES ' +
            '(${perm_id}, ${cap_date}, ${sex}, ${age}, ${species}, ${notes}, ${serial_num}) ' +
          'RETURNING id', rb
        );
      } else {
        return rtn;
      }
    });
  })
  .then(data => res.status(httpCode).json({ success: success, data: data }))
  .catch(err => res.status(400).json({ success: success, data: err }));
});

module.exports = router;
