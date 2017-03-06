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
    post: sql('animals/post.sql'),
    relocs: sql('animals/relocs.sql')
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
  },
  studies: {
    all: sql('studies/all.sql'),
    show: sql('studies/show.sql'),
    deployments: sql('studies/deployments.sql'),
    relocs: sql('studies/relocs.sql'),
    post: sql('studies/post.sql'),
    edit: sql('studies/edit.sql'),
    delete: sql('studies/delete.sql')
  },
  species: {
    all: sql('species/all.sql'),
    show: sql('species/show.sql'),
    deployments: sql('species/deployments.sql'),
    relocs: sql('species/relocs.sql')
  }
}
