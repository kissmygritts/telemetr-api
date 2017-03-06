'use strict'

const sql = require('../sql').species

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: species => rep.one(sql.show, species),
    relocs: species => rep.many(sql.relocs, species),
    deployments: species => rep.many(sql.deployments, species)
  }
}
