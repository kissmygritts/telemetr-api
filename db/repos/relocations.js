`use strict`;

const sql = require('../sql').relocations;

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all)
  };
};
