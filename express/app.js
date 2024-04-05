const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");

const app = express();

// by default it searches in a subdirectory layouts unless this configuration
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: "views/hbs/layouts/",
    helpers: require("./views/hbs/handlers/handlebars"),
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

// #pug
// app.set("view engine", "pug");
// app.set("views", "views/pug");

// #handlebars by default
app.set("view engine", "hbs");
app.set("views", "./views/hbs");

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
  res.status(404).render("not-found", { docTitle: "Not Found" }); //render call the view engine
});

app.listen(3000);
