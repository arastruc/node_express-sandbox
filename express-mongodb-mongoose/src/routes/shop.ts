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
import isAuth from "../middleWare/isAuth";

const express = require("express");

const router = express.Router();

router.get("/", getIndex);

router.get("/products/:id", getProductById);

router.get("/products", getProducts);

router.get("/cart", isAuth, getCart);

router.post("/cart", isAuth, addCart);

router.post("/cart-delete-item", isAuth, deleteProductFromCart);

router.get("/orders", isAuth, getOrders);

router.post("/create-order", isAuth, addOrder);

export default router;
