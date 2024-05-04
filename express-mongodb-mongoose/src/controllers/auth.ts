import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";

declare module "express-session" {
  interface SessionData {
    user: any;
    isLoggedIn: boolean;
  }
}

export const getLogin = async (req: Request, res: Response) => {
  let errorMessage: any = req.flash("error");
  return res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    errorMessage: errorMessage.length > 0 && errorMessage[0],
  });
};

export const postLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  return User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        req.flash("error", "Email ou mot de passe invalide");
        return res.redirect("/login");
      }

      return bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        } else {
          req.flash("error", "Email ou mot de passe invalide");
          return res.redirect("/login");
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/login");
    });
};

export const postLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

export const getSignup = (req: Request, res: Response) => {
  let errorMessage: any = req.flash("error");

  res.render("auth/signup", {
    path: "/signup",
    docTitle: "Signup",
    isAuthenticated: false,
    errorMessage: errorMessage.length > 0 && errorMessage[0],
  });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  const existingUser = await User.findOne({
    email: email,
  });

  const passwordHashed = await bcrypt.hash(password, 12);

  if (existingUser) {
    req.flash(
      "error",
      "Utilisateur existant. Merci de vous connecter ou de choisir un autre email."
    );
    return res.redirect("/signup");
  }

  return new User({
    email: email,
    password: passwordHashed,
    name: (Math.random() + 1).toString(36).substring(7),
  })
    .save()
    .then(() => res.redirect(307, "/login"))
    .catch(console.log);
};
