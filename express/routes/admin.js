const path = require("path");
const express = require("express");
const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product", (_, res) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));

  // .status(200)
  // .send(
  //   '<form action="/admin/product" method="POST" class="form-example"><div class="form-example"><label for="name">Nom du produit: </label><input type="text"  name="product" id="product" required /></div><div class="form-example"><input type="submit" value="Chercher!" /></div></form>'
  // );
});

router.post("/add-product", (req, res) => {
  console.log(req.body, req.baseUrl);
  res.redirect("/");
});

module.exports = router;
