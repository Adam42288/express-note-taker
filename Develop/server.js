const express = require('express');
const path = require('path');
const api = require('./routes/apiroutes.js');
const htmlrouter = require('./routes/htmlroutes.js');

const app = express();
const notes = require('./db/db.json');
// Helper method for generating unique note ids
const uuid = require('./helpers/uuid');

// Middleware for parsing application/json
app.use(express.json());
app.use('/', htmlrouter);
app.use('/api', api);

app.use(express.static('public'));

app.listen(process.env.PORT || 5001);