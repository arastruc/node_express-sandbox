import express, { Request, Response } from "express";

import todoRoutes from "./routes/todo";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(todoRoutes);

app.use((_: Request, res: Response) => {
  res.sendStatus(404);
});

app.listen(3000);
