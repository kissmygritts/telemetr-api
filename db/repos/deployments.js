`use strict`;

const sql = require('../sql').deployments;

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    show: permId => rep.any(sql.show, permId)
  };
};
