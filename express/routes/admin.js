const path = require("path");
const express = require("express");

const router = express.Router();

const products = [];

router.get("/add-product", (_, res) => {
  res.render("add-product", { docTitle: "Ajouter un produit" });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
  products.push({ ...req.body });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
