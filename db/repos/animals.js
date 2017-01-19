`use strict`;

const sql = require('../sql').animals;

module.exports = (rep, pgp) => {
  return {
    getAll: () => rep.many(sql.getAll),
    findById: perm_id => rep.many(sql.findById, perm_id)
  };
};
