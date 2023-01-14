const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const notes = require('./db/db.json');

// Middleware for parsing application/json
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET request for Notes
app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  
    // Sending all reviews to the client
    return res.status(200).json(notes);
  });

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    
    // Prepare a response object to send back to the client
    let response;
  
    // Check if there is anything in the response body
    if (req.body && req.body.text) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.status(201).json(response);
    } else {
      res.status(400).json('Request body must at least contain note text');
    }
  
    // Log the response body to the console
    console.log(req.body.title);
    console.log(req.body.text);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
