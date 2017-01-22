const Express = require('express');
const router = Express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.devices.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err}));
});

router.get('/:serial_num', (req, res) => {
  db.devices.show(req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err}));
});

router.post('/', (req, res) => {
  db.devices.post(req.body)
  .then(data => res.status(201).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err}));
});

router.delete('/:serial_num', (req, res) => {
  db.devices.delete(req.params)
  .then(() => res.status(200).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, error: err }));
});

// // GET all devices
// router.get('/', (req, res) => {
//   db.any('SELECT * FROM devices')
//   .then(data => res.status(200).json({ success: true, data: data }))
//   .catch(err => res.status(400).json({ success: false, data: err }));
// });
//
// router.get('/:serial_num', (req, res) => {
//   db.many('SELECT * FROM devices WHERE serial_num = $(serial_num)', req.body)
//   .then(data => res.status(200).json({ success: true, data: data }))
//   .catch(err => res.status(400).json({ success: false, data: err }));
// });
//
// router.post('/', (req, res) => {
//   let rtn = [];
//   let success = true;
//   let httpCode = 500;
//   // chain queries to the database
//   db.task(t => {
//     return db.any(
//       'SELECT * FROM devices WHERE serial_num = $(serial_num)',
//       req.body
//     )
//     .then(data => {
//       // check if sql returned data
//       if (data.length != 0) {
//         success = false;
//         rtn.push({
//           message: req.body.serial_num + ' already exists in the database.'
//         });
//       }
//       // if data not returned then enter new data
//       if (success) {
//         console.log(req.body);
//         httpCode = 201;
//         return t.one(`INSERT INTO devices (
//             serial_num,
//             frequency,
//             vendor,
//             device_type,
//             mfg_date,
//             model)
//           VALUES (
//             $(serial_num),
//             $(frequency),
//             $(vendor),
//             $(device_type),
//             $(mfg_date),
//             $(model))
//           RETURNING id
//         `, req.body);
//       } else {
//         return rtn;
//       }
//     });
//   })
//   .then(data => res.status(httpCode).json({ success: success, data: data }))
//   .catch(err => res.status(400).json({ success: success, data: err }));
// });

module.exports = router;
