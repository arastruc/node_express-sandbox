import {
  getIndex,
  getProducts,
  getProductById,
  addOrder,
  getCart,
  addCart,
  deleteProductFromCart,
  getOrders,
} from "../controllers/shop";

const express = require("express");

const router = express.Router();

router.get("/", getIndex);

router.get("/products/:id", getProductById);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.post("/cart", addCart);

router.post("/cart-delete-item", deleteProductFromCart);

router.get("/orders", getOrders);

router.post("/create-order", addOrder);

export default router;
