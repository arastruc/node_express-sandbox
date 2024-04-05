import { Router } from "express";
import { ToDo } from "../interfaces/interfaces";

const router = Router();

const todos: Array<ToDo> = [];

router.get("/todos", (_, res) => {
  return res.status(200).json(todos);
});

router.post("/todos", (req, res) => {
  const body = req.body as Omit<ToDo, "date">;
  todos.push({ ...body, date: new Date() });
  return res.status(201).json(todos);
});

router.get("/todos/:todoId", (req, res) => {
  const idTodo = req?.params?.todoId;
  return res.status(200).json(todos.filter(({ id }) => id === +idTodo));
});

router.delete("/todos/:todoId", (req, res) => {
  const idTodo = req?.params?.todoId;
  const indexToDelete = todos.findIndex((item) => item.id === +idTodo);

  if (indexToDelete >= 0) {
    todos.splice(indexToDelete, 1);
    return res.sendStatus(204);
  }
  return res.sendStatus(404);
});

router.put("/todos/:todoId", (req, res) => {
  const idTodo = req?.params?.todoId;
  const indexToDelete = todos.findIndex((item) => item.id === +idTodo);

  if (indexToDelete >= 0) {
    todos.splice(indexToDelete, 1, { ...req.body, date: new Date() });
    return res.status(200).json(todos.filter(({ id }) => id === +idTodo));
  }
  return res.sendStatus(404);
});

export default router;
