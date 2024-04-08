const Cart = require("../models/cart");
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

exports.getProductById = (req, res) => {
  Product.fetchById(req?.params?.id).then((product) => {
    res.render("shop/product-detail", {
      product: product,
      docTitle: "My product detail",
      path: "/product-detail",
    });
  });
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

exports.addCart = (req, res) => {
  return Product.fetchById(req?.body?.productId)
    .then((product) => {
      Cart.addProduct(product);
    })
    .then(() =>
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
      })
    );
};

exports.getOrders = (_, res) => {
  res.render("shop/orders", {
    docTitle: "Your orders",
    path: "/orders",
  });
};

exports.getCheckout = (_, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/cart",
  });
};
