import { Router, Request, Response } from "express";
import { join } from "path";
import rootDir from "../util/path";

const router = Router();

router.get("/add-product", (_: Request, res: any) => {
  res.sendFile(join(rootDir, "views", "add-product.html"));

  // .status(200)
  // .send(
  //   '<form action="/admin/product" method="POST" class="form-example"><div class="form-example"><label for="name">Nom du produit: </label><input type="text"  name="product" id="product" required /></div><div class="form-example"><input type="submit" value="Chercher!" /></div></form>'
  // );
});

router.post("/add-product", (req: Request, res: Response) => {
  console.log(req.body, req.baseUrl);
  res.redirect("/");
});

export default router;
