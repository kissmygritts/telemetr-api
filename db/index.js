'use strict';

const promise = require('bluebird');
const repos = {
  animals: require('./repos/animals'),
  captures: require('./repos/captures'),
  deployments: require('./repos/deployments'),
  relocations: require('./repos/relocations'),
  devices: require('./repos/devices'),
  trajectories: require('./repos/trajectories')
};

// set pg-promise options
const options = {
  promiseLib: promise,

  // trying to be fancy, gets adds all repos from above (repos)
  extend: obj => {
    for (let r in repos) {
      obj[r] = repos[r](obj, pgp);
    }
  }
}

// database config
// TODO: this either needs to be pulled out into a separate file, or supplied in NODE_ENV
const config = {
  host: 'localhost',
  port: 5432,
  database: 'telemetr_pres'
}

// require and init pg-promise with options
const pgp = require('pg-promise')(options);

// create database instance
const db = pgp(config);

// require and use pg-monitor
// TODO: init diagnostic options
// const diag = require('./diagnostics');
// diag.init(options);

module.exports = db;
