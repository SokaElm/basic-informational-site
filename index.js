var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = q.pathname === "/" ? "./index" : "." + q.pathname;

    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("./404", function (err, data) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(err ? "404 Not Found" : data);
          return res.end();
        });
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
