const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Router Middleware

//LISTENING
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);