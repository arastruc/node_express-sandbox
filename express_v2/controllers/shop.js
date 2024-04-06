const Product = require("../models/product");

exports.getProducts = (_, res) => {
  Product.fetchAll().then((products) =>
    res.render("shop/products", {
      products: products,
      docTitle: "My products",
      path: "/products",
    })
  );
};

exports.getIndex = (_, res) => {
  Product.fetchAll().then((products) =>
    res.render("shop/index", {
      products: products,
      docTitle: "Shop",
      path: "/",
    })
  );
};

exports.getCart = (_, res) => {
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
};

exports.getCheckout = (_, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/cart",
  });
};
