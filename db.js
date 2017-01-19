const promise = require('bluebird');
const pgm = require('pg-monitor');

const options = {
  promiseLib: promise
}
pgm.attach(options);

const pgp = require('pg-promise')(options);

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'collars',
  user: null,
  password: null
});

module.exports = { db: db, pgp: pgp };
