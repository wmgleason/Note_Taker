// DEPENDENCIES
// We need to include the path package to get the correct file path for our html

const path = require('path');

// ROUTING

module.exports = function (app) {
  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
// switched to using dirname
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  // return index.html file
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

  // If no matching route is found go back to the main page
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
