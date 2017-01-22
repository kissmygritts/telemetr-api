const Express = require('express');
const _ = require('lodash');
const router = Express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.captures.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

router.get('/:perm_id', (req, res) => {
  // QUESTION: should I check perm_id exists in the database, what error does it return if not?
  db.captures.show(req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

router.post('/', (req, res) => {
  // TODO:  this route will need to do the data checks described below in commented out code
  // right now this route is being used to set up the testing.
  db.captures.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

router.delete('/:perm_id', (req, res) => {
  // TODO: should also delete the record from Animals and Deployments
  db.captures.delete(req.params)
  .then(() => res.status(200).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

/* 2017-01-19
  below is old code use to test transactions with pg-promise
*/

//
// router.post('/', (req, res) => {
//   let rb = req.body;
//   let rtn = [];
//   let success = true;
//   let httpCode = 500;
//
//   db.task(t => {
//     return t.batch([
//       t.any('SELECT * FROM captures WHERE perm_id = ${perm_id}', rb),
//       t.any('SELECT * FROM devices WHERE serial_num = ${serial_num}', rb)
//     ])
//     .then(data => {
//       // add checks
//       if (data[0].length != 0) {
//         success = false;
//         rtn.push({
//           message: rb.perm_id + ' already exists in the database. An animal can\'t have more tan one capture.',
//           data: data[0]
//         })
//       }
//       if (data[1].length == 0) {
//         success = false;
//         rtn.push({
//           message: 'Device ' + rb.serial_num + ' isn\'t entered in the database. Enter the device first.'
//         })
//       }
//       if (success) {
//         httpCode = 201; // TODO: res.status(xxx) without ending the res will set the code
//         return t.one(
//           'INSERT INTO captures ' +
//             '(perm_id, cap_date, sex, age, species, notes, serial_num) ' +
//           'VALUES ' +
//             '(${perm_id}, ${cap_date}, ${sex}, ${age}, ${species}, ${notes}, ${serial_num}) ' +
//           'RETURNING id', rb
//         );
//       } else {
//         return rtn;
//       }
//     });
//   })
//   .then(data => res.status(httpCode).json({ success: success, data: data }))
//   .catch(err => res.status(400).json({ success: success, data: err }));
// });

module.exports = router;
