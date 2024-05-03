import { Request, Response } from "express";
import Product from "../models/product";
import Order from "../models/order";

export const getProducts = (req: Request, res: Response) => {
  return Product.find()
    .then((products) =>
      res.render("shop/products", {
        products: products,
        docTitle: "My products",
        path: "/products",
        isAuthenticated: req?.session?.user,
      })
    )
    .catch(console.log);
};

export const getProductById = (req: Request, res: Response) => {
  const id = req?.params?.id as string;

  return Product.findById(id).then((product) =>
    res.render("shop/product-detail", {
      product: product,
      docTitle: "My product detail",
      path: "/product-detail",
      isAuthenticated: req?.session?.user,
    })
  );
};

export const getIndex = (req: Request, res: Response) => {
  return Product.find()
    .then((products) =>
      res.render("shop/index", {
        products: products,
        docTitle: "Shop",
        path: "/",
        isAuthenticated: req?.session?.user,
      })
    )
    .catch(console.log);
};

export const getCart = (req: any, res: Response) => {
  const userCart = req.user.cart;
  return res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
    products: userCart.items,
    price: userCart.totalPrice,
    isAuthenticated: req?.session?.user,
  });
};

export const addCart = (req: any, res: Response) => {
  return Product.findById(req?.body?.product)
    .then((product: any) => req.user.addToCart(product))
    .then(() => res.redirect("/cart"));
};

export const deleteProductFromCart = (req: any, res: Response) => {
  const user = req.user;
  const product: string = req.body.product;
  return user.removeFromCart(product).then(() => res.redirect("/cart"));
};

export const getOrders = (req: Request, res: Response) => {
  const user = req?.session?.user;
  return Order.find({ "user.name": user.name }).then((orders) =>
    res.render("shop/orders", {
      docTitle: "Your orders",
      path: "/orders",
      orders: orders,
      isAuthenticated: req?.session?.user,
    })
  );
};

export const addOrder = (req: any, res: Response) => {
  const user = req.user;
  const {
    cart: { items, totalPrice },
    name,
    _id,
  } = user;

  return new Order({
    user: { userId: _id, name },
    products: items.map((item: any) => ({
      product: {
        product_id: item.product._id,
        product_title: item.product.title,
      },
      quantity: item.quantity,
    })),
    totalPrice,
  })
    .save()
    .then(() => {
      user.reinitializeCart();
    })
    .then(() => res.redirect("/orders"));
};
