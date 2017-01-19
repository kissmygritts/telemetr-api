`use strict`;
const sql = require('../sql').captures;

module.exports = (rep, pgp) => {
  return {
    getAll: () => rep.many(sql.getAll)
  };
};
