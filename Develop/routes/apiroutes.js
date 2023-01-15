const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json');
// Helper method for generating unique note ids
const uuid = require('../helpers/uuid');
const fs = require('fs');

// CODE HERE
router.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  
    // Sending all reviews to the client
    return res.status(200).json(notes);
  });

// POST request to add a note
router.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // Check if all the required properties for a new note are present
    if (title && text) {
        // Variable for the new note object we will save
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        
        // Obtain the existing notes
        fs.readFile('../db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // add a new note
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
                fs.writeFile(
                    '../db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully added note')
                );
            }

        });
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error creating new note');
    }
  
  });

// delete route for bonus
router.delete('/api/notes/:id', (req, res) => {
// Obtain the existing notes
console.log(req);
const selectedNote = req.id;
fs.readFile('../db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);
console.log(parsedNotes);

        // // add a new note
        // parsedNotes.push(newNote);

        // // Write updated reviews back to the file
        // fs.writeFile(
        //     './db/db.json',
        //     JSON.stringify(parsedNotes, null, 4),
        //     (writeErr) =>
        //         writeErr
        //             ? console.error(writeErr)
        //             : console.info('Successfully added note')
        // );
    }

});
    
    res.send('Got a DELETE request at /user')
  });

module.exports = router;