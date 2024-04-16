import path from "path";
import { mongoConnect } from "./config/mongodb";
import AdminRoutes from "./routes/admin";
import ShopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import User from "./models/user";

const express = require("express");

const app = express();

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use((req: any, _: any, next: any) => {
  return User.findByName("Admin")
    .then((user) => {
      req.body.user = User.from(user);
      req.body.userId = user?.id;
      next();
    })
    .catch(console.log);
});

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use("/admin", AdminRoutes);
app.use(ShopRoutes);

app.use(get404);

mongoConnect(() => {
  app.listen(3000);
});
