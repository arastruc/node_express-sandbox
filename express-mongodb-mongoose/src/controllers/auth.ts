import { Request, Response } from "express";
import User from "../models/user";

declare module "express-session" {
  interface SessionData {
    user: any;
    isLoggedIn: boolean;
  }
}

export const getLogin = async (req: Request, res: Response) => {
  return res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    isAuthenticated: req?.session?.user,
  });
};

export const postLogin = (req: Request, res: Response) => {
  return User.findById("663113ee427daf224b63d2e3")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

export const postLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
