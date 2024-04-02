const http = require("http");

const routes = require("./routes");

/// First way to write minified node server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World! 1st way",
    })
  );
});

server.listen(3333);

/// Second way to write minified node server
const server2 = http.createServer();

server2.on("request", (req, res) => {
  routes.handler(req, res);
  console.log(routes.someText);
});

server2.listen(3334);
