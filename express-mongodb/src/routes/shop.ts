import {
  getIndex,
  getProducts,
  getProductById,
  getCart,
  addCart,
  deleteProductFromCart,
} from "../controllers/shop";

const express = require("express");

const router = express.Router();

router.get("/", getIndex);

router.get("/products/:id", getProductById);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.post("/cart", addCart);

router.post("/cart-delete-item", deleteProductFromCart);

// router.get("/orders", shopController.getOrders);

// router.post("/create-order", shopController.addOrder);
// router.get("/checkout", shopController.getCheckout);

export default router;
