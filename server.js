const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path')
const uuid = require('./helpers/uuid');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

////////////////////////////GET/////////////////////////////////
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET Route for NOTES page
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);
///GET Route for /api/notes
const data = require('./db/db.json');
app.get('/api/notes', (req,res) =>
    res.status(200).json(data));



// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.log(req.body);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid()
    };
    // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response).send();
  } else {
    res.status(500).json('Error in posting review');
  }
});

//LISTENING
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);