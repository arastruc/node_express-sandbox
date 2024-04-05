const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (_, res) => {
  console.log("shop", adminData.products);
  res.render("shop", {
    products: adminData.products,
    docTitle: "My e-shop",
    path: "/",
  }); //render call the view engine
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
