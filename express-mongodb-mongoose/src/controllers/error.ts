import { Request, Response } from "express";

export const get404 = (_: Request, res: Response) => {
  res
    .status(404)
    .render("not-found", { docTitle: "Not Found", path: "unknown" });
};
