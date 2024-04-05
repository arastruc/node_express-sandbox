import express from "express";

import feedRoutes from "./routes/feed";

const app = express();

app.use(express.json());

//used to fix CORS errors
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/feed", feedRoutes);

app.use((_, res) => res.sendStatus(404));

app.listen(8080);
