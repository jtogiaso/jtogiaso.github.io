// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

const path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
// ===============================================================================

// Get all tests test creator
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/html', 'home.html'));
});


app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/html', 'survey.html'));
});



};
