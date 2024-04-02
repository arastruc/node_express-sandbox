const requestHandler = (req, res) => {
  const { url } = req;

  const bodyChunks = [];

  switch (url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write("<html><body>");
      res.write("<h1>Hello from Node JS</h1>");
      res.write("<ul>");
      res.write("<li>Hubert Reeves</li>");
      res.write("<li>Novak Djokovic</li>");
      res.write("<li>Taylor Swift</li>");
      res.write("</ul>");
      res.write("<section>");
      res.write(
        '<form action="/create-user" method="POST" class="form-example"><div class="form-example">'
      );
      res.write("<h1>Enter a username</h1>");
      res.write(
        '<label for="name">Username: </label><input type="text" min="1" max="250" name="username" id="username" required />'
      );
      res.write(
        '</div><div class="form-example"><input type="submit" value="Submit" /></div>'
      );
      res.write("</section>");
      return res.end("</body></html>");

    case "/create-user":
      //Here I assuming redirect before logging body
      req
        .on("data", function (chunk) {
          bodyChunks.push(chunk);
        })
        .on("end", function () {
          var body = Buffer.concat(bodyChunks);
          // console.log(body);
          // console.log(body?.toString());
          console.log(body?.toString()?.split("=")[1]);
        });

      res.writeHead(302, { Location: "/" });
      return res.end();

    default:
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write("<html><body>");
      res.write("<h1>Unknown Page</h1>");
      return res.end("<a href= '/'>GO to home page</a></body></html>");
  }
};

exports.handler = requestHandler;
