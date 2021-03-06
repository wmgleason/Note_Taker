
// Set up to allow the use of  Express.js
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(db.json());