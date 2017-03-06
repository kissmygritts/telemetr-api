'use strict'
const sql = require('../sql').relocations

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: id => rep.one(sql.show, id),
    // POST isn't working in the repo
    // post: data => {
    //   let cs = new pgp.helpers.ColumnSet([
    //     'serial_num', 'acq_time_lcl', 'longitude', 'latitude'
    //   ],
    //     { table: 'gps' }
    //   )
    //   let up = pgp.helpers.insert(data, cs)
    //   rep.none(up)
    // },
    validity: () => rep.many(sql.validity)
  }
}
