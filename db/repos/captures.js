'use strict'
const sql = require('../sql').captures

module.exports = (rep, pgp) => {
  return {
    all: where => rep.many(sql.all, where),
    show: permId => rep.many(sql.show, permId),
    post: body => rep.one(sql.post, body),
    delete: permId => rep.none(sql.delete, permId)
  }
}
