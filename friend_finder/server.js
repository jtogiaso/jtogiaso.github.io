// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");

// Create an instance of the express app.
var app = express();

// Specify the port.
var port = 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Data
var icecreams = [
  { name: "vanilla", price: 10, awesomeness: 3 },
  { name: "chocolate", price: 4, awesomeness: 8 },
  { name: "banana", price: 1, awesomeness: 1 },
  { name: "greentea", price: 5, awesomeness: 7 },
  { name: "jawbreakers", price: 6, awesomeness: 2 },
  { name: "vanilla", price: 10, awesomeness: 3 }
];

// Routes
app.get("/icecream/:name", function(req, res) {
  for (var i = 0; i < icecreams.length; i++) {
    if (icecreams[i].name === req.params.name) {
      res.render("icecream", icecreams[i]);
    }
  }
});

app.get("/icecream", function(req, res) {
  res.render("ics", { ics: icecreams });
});

app.get("/", function(req, res) {
  console.log(res);
  res.json(simpleStringify(res));
});


// Initiate the listener.
app.listen(port);


function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return simpleObject; // returns cleaned up JSON
};