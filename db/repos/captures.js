`use strict`;
const sql = require('../sql').captures;

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all)
  };
};
