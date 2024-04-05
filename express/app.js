const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "pug");
// app.set("view engine", "ejs");
// app.set("views", "views"); NOT Mandatory (default value directory)

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((_, res) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
  res.status(404).render("not-found"); //render call the view engine
});

app.listen(3000);
