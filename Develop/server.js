const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const notes = require('./db/db.json');

// Middleware for parsing application/json
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req,res) =>
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
    
    // Destructuring assignment for the items in req.body
    let response;
    const { title, text } = req.body;
  
    // Check if there is anything in the response body
    if (title && text) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.status(201).json(response);
    } else {
      res.status(400).json('Request body must at least contain note text');
    }
  
    // Log the response body to the console
    console.log(title);
    console.log(text);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
