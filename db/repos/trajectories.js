'use strict'
const sql = require('../sql').trajectories

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all)
  }
}
