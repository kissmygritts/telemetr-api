const Express = require('express')
const router = Express.Router()
// const dbgeo = require('dbgeo')
const db = require('../db')
const pgp = db.$config.pgp

router.get('/', (req, res) => {
  db.relocations.all()
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, err: err }))
})

router.get('/:id', (req, res) => {
  db.relocations.show(req.params)
  .then(data => res.status(200).json({ success: true, data: data }))
  .catch(err => res.status(400).json({ success: false, err: err }))
})

router.post('/', (req, res) => {
  let cs = new pgp.helpers.ColumnSet([
    'serial_num',
    'acq_time_lcl',
    'longitude',
    'latitude',
    'activity',
    'temperature',
    'hdop',
    'pdop',
    'n_sats',
    'fixtype',
    'gps_volts'
  ], { table: 'gps' })
  let up = pgp.helpers.insert(req.body, cs)

  db.none(up)
  // db.relocations.post(req.body)
  .then(() => res.status(201).json({ success: true }))
  .catch(err => res.status(400).json({ success: false, err: err }))
})

// 2017-01-19 - old queries below, will convert to newer methods
//
// // GET request: return geom as a geojson
// router.get('/:perm_id/geojson', (req, res) => {
//   db.any(`
//     SELECT
//       animals.perm_id,
//       ST_AsGeoJSON(telemetry.geom) AS geom
//     FROM
//       animals INNER JOIN telemetry ON animals.id = telemetry.animal_id
//     WHERE
//       geom IS NOT NULL AND
//       animals.perm_id = $(perm_id) AND
//       telemetry.validity_id = 2
//     LIMIT 100
//     `, req.params
//   )
//     .then(data => {
//       dbgeo.parse(data, {
//         geometryType: 'geojson',
//         outputFormat: 'geojson'
//       }, (err, result) => {
//         res.status(200).json({ success: true, data: result });
//       });
//     })
//     .catch(err => res.status(400).json({ success: false, data: err }));
// });
//
// router.post('/', (req, res) => {
//   let rtn = [];
//   let success = true;
//   let httpCode = 500;
//
//   db.task(t => {
//     return t.batch([
//       t.any('SELECT * FROM devices WHERE serial_num = $(serial_num)', req.body),
//       t.any(`
//         SELECT
//           deployments.id,
//           devices.serial_num,
//           animals.perm_id,
//           deployments.inservice,
//           deployments.outservice
//         FROM deployments, devices, animals
//         WHERE
//           deployments.animal_id = animals.id AND
//           deployments.device_id = devices.id AND
//           devices.serial_num = $(serial_num)
//         `, req.body)
//     ])
//     .then(data => {
//       // check device exists in database
//       if (data[0].length == 0) {
//         success = false;
//         rtn.push({
//           message: 'A device with serial_num ' + req.body.serial_num +
//           ' is not in the database. Enter this device first.'
//         });
//       }
//       // check deployment is in the database
//       if (data[1].length == 0) {
//         success = false;
//         rtn.push({
//           message: 'Device ' + req.body.serial_num + ' does not have ' +
//           'a deployment in deployments table. An capture needs to be entered.'
//         });
//       }
//       // if constraints are met insert data
//       if (success) {
//         httpCode = 201;
//         console.log('INSERT DATA')
//         return t.one(`
//         INSERT INTO raw_gps (
//           serial_num,
//           acq_time,
//           activity,
//           latitude,
//           longitude,
//           altitude)
//         VALUES (
//           $(serial_num),
//           $(acq_time),
//           $(activity),
//           $(latitude),
//           $(longitude),
//           $(altitude))
//         RETURNING id
//         `, req.body);
//       } else {
//         console.log('RETURN 500');
//         return rtn;
//       }
//     })
//   })
//   .then(data => res.status(httpCode).json({ success: success, data: data }))
//   .catch(err => res.status(400).json({ success: success, data: err }));
// });
//
// router.post('/batch', (req, res) => {
//   // a reusable table definition, similar to a model
//   const cs = pgp.helpers.ColumnSet([
//     'serial_num',
//     'acq_time',
//     'activity',
//     'latitude',
//     'longitude',
//     'altitude'
//   ], { table: 'raw_gps' });
//
//   // creating the query string
//   const query = pgp.helpers.insert(req.body, cs);
//   console.log(query); // printing the query string to the console
//
//   // execute query
//   db.none(query)
//   .then(() => res.status(201).json({
//     success: true,
//     message: 'successfully appended data to raw_gps' }))
//   .catch(err => res.status(400).json({ success: false, data: err }));
// });

module.exports = router
