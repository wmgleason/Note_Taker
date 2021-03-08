// server stuff originally in index.js
// separating to better organize the code
// trying something
// const path = require("path");
const path = require("path");
// Require Express
var express = require("express");

// Create an express server.
var app = express();

// Set port.
var PORT = process.env.PORT || 3000;



// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// Point the server to the route files.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
// Listen on port.
app.listen(PORT, function() {
  console.log("Great - the server is running and listening on PORT: " + PORT);
});