const api = require("./api");
const fs = require("fs");

const requestHandler = (req, res) => {
  const { url } = req;

  switch (url) {
    case "/planet_result":
      const bodyChunks = [];
      return req
        .on("data", function (chunk) {
          // You can process streamed parts here...
          bodyChunks.push(chunk);
        })
        .on("end", function () {
          var body = Buffer.concat(bodyChunks);
          const planetId = body.toString()?.split("=")[1];

          api
            .findById(planetId)
            .then((planets) => {
              fs.appendFile(
                "planet_search.txt",
                `Planete Recherchée : ${planetId}\n`,
                (err) => {
                  err && console.log(err);
                }
              );
              return planets;
            })
            .then((planets) => {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(planets));
            })
            .catch((e) => {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(e);
            });
          // ...and/or process the entire body here.
        });

    case "/redirect":
      res.writeHead(302, { Location: "/" });
      return res.end();

    case "/planet_search":
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write(
        '<html><body><form action="/planet_result" method="POST" class="form-example"><div class="form-example">'
      );
      res.write("<h1>Recherche planète</h1>");
      res.write(
        '<label for="name">Id planète (1 à 60): </label><input type="number" min="1" max="60" name="planet" id="name" required />'
      );
      res.write(
        '</div><div class="form-example"><input type="submit" value="Chercher!" /></div>'
      );
      return res.end("</form></body></html>");

    case "/":
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write("<html><body>");
      return res.end(
        "<a href= '/planet_search'>Chercher planète</a></body></html>"
      );
    case "/":
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write("<html><body>");
      res.write("<h1>Unknown Page</h1>");
      return res.end("<a href= '/'>GO to home page</a></body></html>");
  }
};

//Second way to export in Node
module.exports = {
  handler: requestHandler,
  someText: "a dummy decoy",
};

//Second way to export in Node
// exports.handler = requestHandler;
// exports.someText = "a dummy decoy";
