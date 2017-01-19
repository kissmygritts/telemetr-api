`use strict`;

const sql = require('../sql').animals;

module.exports = (rep, pgp) => {
  return {
    getAll: () => rep.many(sql.getAll)
  };
};
