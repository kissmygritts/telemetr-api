'use strict'

const sql = require('../sql').animals

module.exports = (rep, pgp) => {
  return {
    all: where => rep.many(sql.all, where),
    show: permId => rep.many(sql.show, permId),
    post: body => rep.one(sql.post, body),
    delete: id => rep.one(sql.delete, id),
    edit: body => rep.one(sql.edit, body),
    relocs: permId => rep.many(sql.relocs, permId)
  }
}
