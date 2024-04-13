const express = require("express");
import { getAddProduct } from "../controllers/admin";

const router = express.Router();

router.get("/add-product", getAddProduct);
// router.post("/add-product", adminController.postAddProduct);

// router.get("/edit-product/:id", adminController.getEditProduct);
// router.post("/edit-product", adminController.postEditProduct);

// router.post("/delete-products/:id", adminController.deleteProductById);

// router.get("/products", adminController.getProducts);

export default router;
