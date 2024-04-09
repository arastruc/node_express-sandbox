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

exports.postAddProduct = (req, res) => {
  Product.from(req.body)
    .save()
    .then(() => res.redirect("/"));
};

exports.getEditProduct = (req, res) => {
  const edit = req.query.edit;
  if (edit === "true") {
    return Product.fetchById(req.params.id).then((product) =>
      res.render("admin/edit-product", {
        product: product,
        docTitle: "Admin Products",
        path: "/admin/edit-product",
      })
    );
  }
  return res.redirect("/");
};

exports.postEditProduct = (req, res) => {
  const body = req.body;
  return Product.from(body)
    .update()
    .then((products) =>
      res.render("admin/products", {
        products: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      })
    );
};

exports.deleteProductById = (req, res) => {
  Product.deleteById(req?.params?.id).then(() => {
    res.redirect("/");
  });
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
