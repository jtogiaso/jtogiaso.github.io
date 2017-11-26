// Dependencies
var http = require("http");
var fs = require("fs");
// Set our port to 8080
var PORT = 8080;
// Create our server
var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {

  var requestedFile = req.url;
  if (requestedFile == '/') {
    requestedFile = '/index.html';
  }
  requestedFile = __dirname + requestedFile;

  // Check file extension
  // Map content type to file extension

  // Do we have permission to READ this file?
  fs.access(requestedFile, fs.constants.R_OK, function(err) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end('<html><body><h1>Doh!</h1><h2>File not found: '+requestedFile+'</h2></body></html>');
    } 
    else {
      // Here we use the fs package to read our index.html file
      fs.readFile(requestedFile, function(err, data) {

        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end('<html><body><h1>Doh!</h1><h2>File not found1: '+requestedFile+'</h2></body></html>');
        }
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  });
}

// Starts our server
server.listen(PORT, function() {
  console.log("Server is listening on http://localhost:" + PORT);
});