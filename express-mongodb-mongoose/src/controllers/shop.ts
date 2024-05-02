import { Request, Response } from "express";
import Product from "../models/product";
import Order from "../models/order";

export const getProducts = (_: Request, res: Response) => {
  return Product.find()
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
  const id = req?.params?.id as string;

  return Product.findById(id).then((product) =>
    res.render("shop/product-detail", {
      product: product,
      docTitle: "My product detail",
      path: "/product-detail",
    })
  );
};

export const getIndex = (_: Request, res: Response) => {
  return Product.find()
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
  const userCart = req.body.user.cart;
  return res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
    products: userCart.items,
    price: userCart.totalPrice,
  });
};

export const addCart = (req: Request, res: Response) => {
  const currentUser = req.body.user;
  return Product.findById(req?.body?.product)
    .then((product: any) => currentUser.addToCart(product))
    .then(() => res.redirect("/cart"));
};

export const deleteProductFromCart = (req: Request, res: Response) => {
  const user = req.body.user;
  const product: string = req.body.product;
  return user.removeFromCart(product).then(() => res.redirect("/cart"));
};

export const getOrders = (req: Request, res: Response) => {
  const user = req.body.user;
  return Order.find({ "user.name": user.name }).then((orders) =>
    res.render("shop/orders", {
      docTitle: "Your orders",
      path: "/orders",
      orders: orders,
    })
  );
};

export const addOrder = (req: Request, res: Response) => {
  const user = req.body.user;
  const {
    cart: { items, totalPrice },
    name,
    _id,
  } = user;

  console.log(items[0]);

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
