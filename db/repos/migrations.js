'use strict'
const sql = require('../sql').migrations

module.exports = (rep, pgp) => {
  return {
    up: () => rep.none(sql.up),
    down: () => rep.none(sql.down)
  }
}
