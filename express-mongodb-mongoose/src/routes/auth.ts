import {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
} from "../controllers/auth";

const express = require("express");

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", postLogout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

export default router;
