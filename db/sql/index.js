'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  const options = {
    minify: true,
    debug: true
  };
  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    console.log(qf.error);
  }

  return qf;
}

module.exports = {
  devices: {
    all: sql('devices/all.sql'),
    show: sql('devices/show.sql'),
    post: sql('devices/post.sql')
  },
  animals: {
    getAll: sql('animals/all.sql'),
    show: sql('animals/show.sql')
  },
  captures: {
    all: sql('captures/all.sql')
  },
  deployments: {
    all: sql('deployments/all.sql'),
    show: sql('deployments/show.sql')
  },
  relocations: {
    all: sql('relocations/all.sql')
  }
};
