`use strict`;

const sql = require('../sql').deployments;

module.exports = (rep, pgp) => {
  return {
    all: () => rep.many(sql.all),
    permId: perm_id => rep.any(sql.permId, perm_id)
  };
};
