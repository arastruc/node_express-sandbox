const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.render("admin/add-product", {
    docTitle: "Ajouter un produit",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  Product.from(req.body)
    .save()
    .then(() => res.redirect("/"));
};

exports.getProducts = (_, res) => {
  Product.fetchAll().then((products) =>
    res.render("admin/products", {
      products: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    })
  );
};
