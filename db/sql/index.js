'use strict'
const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql (file) {
  const fullPath = path.join(__dirname, file)
  const options = {
    minify: true,
    debug: true
  }
  const qf = new QueryFile(fullPath, options)

  if (qf.error) {
    console.log(qf.error)
  }

  return qf
}

module.exports = {
  devices: {
    all: sql('devices/all.sql'),
    show: sql('devices/show.sql'),
    post: sql('devices/post.sql'),
    delete: sql('devices/delete.sql')
    // TODO: /devices/:perm_id/deployments route?? get all the deployments for a device?
  },
  animals: {
    all: sql('animals/all.sql'),
    show: sql('animals/show.sql'),
    post: sql('animals/post.sql')
  },
  captures: {
    all: sql('captures/all.sql'),
    show: sql('captures/show.sql'),
    post: sql('captures/post.sql'),
    delete: sql('captures/delete.sql')
  },
  deployments: {
    all: sql('deployments/all.sql'),
    show: sql('deployments/show.sql')
  },
  relocations: {
    all: sql('relocations/all.sql'),
    show: sql('relocations/show.sql'),
    post: sql('relocations/post.sql'),
    validity: sql('relocations/validity.sql')
  },
  trajectories: {
    all: sql('trajectories/all.sql')
  },
  migrations: {
    up: sql('migrations/up.sql'),
    down: sql('migrations/down.sql')
  }
}
