'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  const options = { minify: true };
  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    console.log(qf.error);
  }

  return qf;
}

module.exports = {
  animals: {
    getAll: sql('animals/getAll.sql')
  },
  captures: {
    getAll: sql('captures/getAll.sql')
  }
};
