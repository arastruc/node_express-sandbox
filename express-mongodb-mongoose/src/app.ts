import path from "path";
import AdminRoutes from "./routes/admin";
import ShopRoutes from "./routes/shop";
import AuthRoutes from "./routes/auth";
import { get404 } from "./controllers/error";
import mongoose from "mongoose";
import User from "./models/user";
import isAuth from "./middleWare/isAuth";
import csurf from "csurf";
import flash from "express-flash";
import { Request, Response } from "express";

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI =
  "mongodb+srv://aastruc86:Hji9fQf7pIWV7vOV@cluster0.89y6xfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csurf();

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

// Catch errors
store.on("error", function (error: any) {
  console.log(error);
});

//configure session (cookie can be configured)
app.use(
  session({
    secret: "my-secret-token",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req: any, _: any, next: any) => {
  if (!req.session.user) {
    return next();
  }
  return User.findById(req.session.user._id)
    .populate("cart.items.product")
    .then((user: any) => {
      req.user = user;
      next();
    })
    .catch(console.log);
});

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use((req: Request, res: Response, next: any) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", isAuth, AdminRoutes);
app.use(AuthRoutes);
app.use(ShopRoutes);

app.use(get404);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);
