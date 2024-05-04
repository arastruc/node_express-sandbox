import { Request, Response } from "express";

const isAuth = (req: Request, res: Response, next: any) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  next();
};

export default isAuth;
