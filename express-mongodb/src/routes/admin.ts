const express = require("express");
import {
  getAddProduct,
  postAddProduct,
  deleteProductById,
  getProducts,
  postEditProduct,
  getEditProduct,
} from "../controllers/admin";

const router = express.Router();

router.get("/add-product", getAddProduct);
router.post("/add-product", postAddProduct);

router.get("/edit-product/:id", getEditProduct);
router.post("/edit-product", postEditProduct);

router.post("/delete-products/:id", deleteProductById);

router.get("/products", getProducts);

export default router;
