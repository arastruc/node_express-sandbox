import path from "path";
import AdminRoutes from "./routes/admin";
import ShopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import User from "./models/user";
import mongoose from "mongoose";

const express = require("express");

const app = express();

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use((req: any, _: any, next: any) => {
  return User.findOne({ name: "Admin" })
    .populate("cart.items.product")
    .then((user) => {
      req.body.user = user;
      next();
    })
    .catch(console.log);
});

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use("/admin", AdminRoutes);
app.use(ShopRoutes);

app.use(get404);

mongoose
  .connect(
    "mongodb+srv://aastruc86:Hji9fQf7pIWV7vOV@cluster0.89y6xfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
