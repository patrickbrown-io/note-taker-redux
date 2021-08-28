const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

////GET////
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

//GET Route for NOTES page
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

//LISTENING
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);