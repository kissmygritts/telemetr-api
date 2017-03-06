'use strict'

const sql = require('../sql').animals

module.exports = (rep, pgp) => {
  return {
    all: where => rep.many(sql.all, where),
    show: permId => rep.many(sql.show, permId),
    post: body => rep.one(sql.post, body),
    relocs: permId => rep.many(sql.relocs, permId)
  }
}
