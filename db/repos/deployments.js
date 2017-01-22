'use strict';
const sql = require('../sql').deployments;

module.exports = (rep, pgp) => {
  /*
  deployments will only have all and show routes becuase
  it's SQL statement is from a view. Technically, there
  should never be a post to deployments, this should happen via triggers when a new capture is entered.

  There will be an edit route that will be used to update
  the outservice date.
  */
  return {
    all: () => rep.many(sql.all),
    show: permId => rep.any(sql.show, permId)
  };
};
