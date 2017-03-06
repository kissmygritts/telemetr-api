const Express = require('express')
const router = Express.Router()
const db = require('../db')
const pgp = db.$config.pgp

router.get('/', (req, res) => {
  db.deployments.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

router.get('/:id', (req, res) => {
  db.deployments.show(`WHERE deployments_id = ${req.params.id}`)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, error: err }))
})

/* 2017-01-20
  pre query file routes
*/
// router.get('/', (req, res) => {
//   db.any(`
//       SELECT
//         deployments.id,
//         animals.perm_id,
//         devices.serial_num,
//         deployments.inservice,
//         deployments.outservice
//       FROM deployments, animals, devices
//       WHERE
//         deployments.animal_id = animals.id AND
//         deployments.device_id = devices.id
//     `)
//     .then(data => res.status(200).json({ success: true, data: data }))
//     .catch(err => res.status(400).json({ success: false, data: err }))
// });
//
// router.get('/:perm_id', (req, res) => {
//   db.many(`
//       SELECT
//         deployments.id,
//         animals.perm_id,
//         devices.serial_num,
//         deployments.inservice,
//         deployments.outservice
//       FROM deployments, animals, devices
//       WHERE
//         deployments.animal_id = animals.id AND
//         deployments.device_id = devices.id AND
//         animals.perm_id = $(perm_id)
//     `, req.params
//   )
//   .then(data => res.status(200).json({ success: true, data: data}))
//   .catch(err => res.status(400).json({ success: false, data: err }));
// });

module.exports = router
