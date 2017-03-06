'use strict'

const sql = require('../sql').studies

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: id => rep.one(sql.show, id),
    relocs: id => rep.many(sql.relocs, id),
    deployments: id => rep.many(sql.deployments, id)
  }
}
