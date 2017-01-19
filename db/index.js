'use strict';

const promise = require('bluebird');
const repos = {
  animals: require('./repos/animals'),
  captures: require('./repos/captures'),
  deployments: require('./repos/deployments')
};

// set pg-promise options
const options = {
  promiseLib: promise,

  // trying to be fancy, lets get it working first
  extend: obj => {
    for (let r in repos) {
      obj[r] = repos[r](obj, pgp);
    }
  }

  // extend: obj => {
  //   obj.animals = repos.animals(obj, pgp);
  // }
}

// database config
// TODO: this either needs to be pulled out into a separate file, or supplied in NODE_ENV
const config = {
  host: 'localhost',
  port: 5432,
  database: 'telemetr'
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
