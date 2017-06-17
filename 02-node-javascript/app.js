var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');

function onRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(module2.myVariable);
  module2.myFunction();
  res.end();
}

http.createServer(onRequest).listen(3000);
