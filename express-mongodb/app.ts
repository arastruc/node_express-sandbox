import { Request, Response } from "express";
import path from "path";
import { mongoConnect } from "./config/mongodb";
import AdminRoute from "./routes/admin";

const express = require("express");

const app = express();

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", AdminRoute);
// app.use(shopRoutes);

// app.use(errorController.get404);

app.use("/", (req: Request, res: Response) =>
  res.send("<h1>Hi from express</h1>")
);

mongoConnect(() => {
  app.listen(3000);
});
