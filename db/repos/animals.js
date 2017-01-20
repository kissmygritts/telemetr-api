`use strict`;

const sql = require('../sql').animals;

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: permId => rep.many(sql.show, permId)
  };
};
