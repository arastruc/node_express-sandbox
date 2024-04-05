import { Router, Request, Response } from "express";
import { join } from "path";
import rootDir from "../util/path";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.sendFile(join(rootDir, "views", "shop.html"));
});

export default router;
