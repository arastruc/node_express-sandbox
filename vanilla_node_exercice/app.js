const http = require("http");
const routes = require("./routes");

const server = http.createServer();

server.on("request", (req, res) => {
  routes.handler(req, res);
});

server.listen(3000);
