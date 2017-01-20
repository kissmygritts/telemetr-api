`use strict`;
const sql = require('../sql').relocations;

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: permId => rep.many(sql.show, permId),
    validity: () => rep.many(sql.validity)
  };
};
