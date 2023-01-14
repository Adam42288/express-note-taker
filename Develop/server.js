const express = require('express');
const path = require('path');

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

  // POST request
app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
    // Show the user agent information in the terminal
    console.log(req.body);
  
    // Log our request to the terminal
    console.log(`${req.method} request received`);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
