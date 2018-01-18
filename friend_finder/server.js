// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3300;

//For BodyParser
// =============================================================
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
// =============================================================
app.use(express.static('app/public'));

// Routes
// =============================================================

require("./app/routing/api_routes.js")(app);
require("./app/routing/html_routes.js")(app);


// Initiate the listener.
app.listen(PORT, function(err) {

  if (!err){
    console.log("App listening on PORT " + PORT);
  }
  else {
    console.log(err)
  }

});
