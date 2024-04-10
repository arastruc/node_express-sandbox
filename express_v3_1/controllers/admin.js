const Product = require("../models/product");

exports.getAddProduct = (_, res) => {
  res.render("admin/add-product", {
    docTitle: "Ajouter un produit",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  Product.create({ ...req.body }).then(() => res.redirect("/"));
};

exports.getEditProduct = (req, res) => {
  const edit = req.query.edit;
  if (edit === "true") {
    return Product.findByPk(req.params.id).then((product) =>
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
  const { id, ...data } = req.body;
  return Product.update(data, { where: { id: id } }).then(() =>
    res.redirect("products")
  );
};

exports.deleteProductById = (req, res) => {
  Product.destroy({ where: { id: req?.params?.id } }).then(() => {
    res.redirect("/");
  });
};

exports.getProducts = (_, res) => {
  Product.findAll().then((products) =>
    res.render("admin/products", {
      products: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    })
  );
};
