import { Request, Response } from "express";
import Product from "../models/product";
import Cart from "../models/cart";
import User from "../models/user";

export const getProducts = (_: Request, res: Response) => {
  return Product.findAll()
    .then((products) =>
      res.render("shop/products", {
        products: products,
        docTitle: "My products",
        path: "/products",
      })
    )
    .catch(console.log);
};

export const getProductById = (req: Request, res: Response) => {
  return Product.findById(req?.params?.id).then((product) =>
    res.render("shop/product-detail", {
      product: product,
      docTitle: "My product detail",
      path: "/product-detail",
    })
  );
};

export const getIndex = (_: Request, res: Response) => {
  return Product.findAll()
    .then((products) =>
      res.render("shop/index", {
        products: products,
        docTitle: "Shop",
        path: "/",
      })
    )
    .catch(console.log);
};

export const getCart = (req: Request, res: Response) => {
  const userCart: Cart = req.body.user.cart;
  return res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
    products: userCart.items,
    price: userCart.totalPrice,
  });
};

export const addCart = (req: Request, res: Response) => {
  const currentUser: User = req.body.user;

  return Product.findById(req?.body?.productId)
    .then((product: any) => currentUser.addToCart(product))
    .then(() => res.redirect("/cart"));
};

export const deleteProductFromCart = (req: Request, res: Response) => {
  const user: User = req.body.user;
  const productId: string = req.body.productId;

  return user.removeFromCart(productId).then(() => res.redirect("/cart"));
};

// exports.getOrders = (req, res) => {
//   req.user.getOrders({ include: Product }).then((orders) =>
//     res.render("shop/orders", {
//       docTitle: "Your orders",
//       path: "/orders",
//       orders: orders,
//     })
//   );
// };

// exports.addOrder = async (req, res) => {
//   const cart = await req.user.getCart({
//     include: {
//       model: Product,
//     },
//   });

//   const { totalPrice, products } = cart;

//   const order = await req.user.createOrder({
//     totalPrice: totalPrice,
//   });

//   return order
//     .addProducts(products)
//     .then(cart.removeProducts(products))
//     .then(() => cart.update({ totalPrice: 0 }))
//     .then(() => res.redirect("/orders"));
// };

// exports.getIndex = (_, res) => {
//   Product.findAll().then((products) =>
//     res.render("shop/index", {
//       products: products,
//       docTitle: "Shop",
//       path: "/",
//     })
//   );
// };

// exports.getCheckout = (_, res) => {
//   res.render("shop/checkout", {
//     docTitle: "Checkout",
//     path: "/cart",
//   });
