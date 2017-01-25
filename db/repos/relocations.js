'use strict'
const sql = require('../sql').relocations

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: permId => rep.many(sql.show, permId),
    post: data => rep.many(sql.post, data),
    validity: () => rep.many(sql.validity)
  }
}
