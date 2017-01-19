'use strict';

const Express = require('express');
const bodyParser = require('body-parser');
const app = Express();
// const db = require('./db');  // As long as the routes use the db logic
// I don't need to require the database here

// QUESTION: check body parser requirements for an API??
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // set up routes
// const deployments = require('./routes/deployments');
const animals = require('./routes/animals');
// const devices = require('./routes/devices');
const captures = require('./routes/captures');
// const relocations = require('./routes/relocations');

// app.use('/deployments', deployments);
app.use('/animals', animals);
// app.use('/devices', devices);
app.use('/captures', captures);
// app.use('/relocations', relocations);

app.listen(8080, () => {
  console.log('API listening on port 8080');
});
