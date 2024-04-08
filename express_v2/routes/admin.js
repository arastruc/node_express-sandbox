const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:id", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-products/:id", adminController.deleteProductById);

router.get("/products", adminController.getProducts);

exports.routes = router;
