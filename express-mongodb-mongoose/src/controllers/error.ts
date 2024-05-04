import { Request, Response } from "express";

export const get404 = (req: Request, res: Response) => {
  res.status(404).render("not-found", {
    docTitle: "Not Found",
    path: "unknown",
  });
};
