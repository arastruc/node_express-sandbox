const path = require("path");
const express = require("express");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(3333);
