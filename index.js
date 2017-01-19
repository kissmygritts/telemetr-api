'use strict';

const Express = require('express');
const bodyParser = require('body-parser');
const app = Express();

// TODO: I don't think I need db here. I need it in the routes
const db = require('./db');



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

GET('/animals', db.animals.getAll);

function GET(url, handler) {
  app.get(url, (req, res) => {
    handler(req)
    .then(data => res.status(200).json({ success: true, data: data }))
    .catch(err => res.status(400).json({ success: false, error: err }));
  });
}

// // set up routes
// const deployments = require('./routes/deployments');
// const animals = require('./routes/animals');
// const devices = require('./routes/devices');
// const captures = require('./routes/captures');
// const relocations = require('./routes/relocations');
//
// app.use('/deployments', deployments);
// app.use('/animals', animals);
// app.use('/devices', devices);
// app.use('/captures', captures);
// app.use('/relocations', relocations);

app.listen(8080, () => {
  console.log('API listening on port 8080');
});
