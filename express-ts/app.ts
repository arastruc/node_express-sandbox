import express, { Request, Response } from "express";
import { join } from "path";

import todoRoutes from "./routes/todo";

// import adminRoutes from "./routes/admin";
// import shopRoutes from "./routes/shop";

const app = express();

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(join(__dirname, "public")));

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(todoRoutes);

app.use((_: Request, res: Response) => {
  res.status(404).sendFile(join(__dirname, "views", "not-found.html"));
});

app.listen(3333);
