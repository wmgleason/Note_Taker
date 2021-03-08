const path = require('path');
const fs = require('fs');
let noteCount = 1;

// LOAD DATA for notes
const notesData = require('../data/notesData');

// ROUTING

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

module.exports = (app) => {

  app.get('/api/notes', (req, res) => res.json(notesData));

//   app.get('/api/waitlist', (req, res) => res.json(waitListData));

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (notesData.length < 5) {
      notesData.push(req.body);
      res.json(true);
    } 
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });



  app.post('/api/clear', (req, res) => {

    notesData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
