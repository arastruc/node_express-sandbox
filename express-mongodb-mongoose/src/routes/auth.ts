import { getLogin, postLogin, postLogout } from "../controllers/auth";

const express = require("express");

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/logout", postLogout);

export default router;
