const Product = require("../models/product");


exports.getAddProduct = (_, res) => {
  res.render("add-product", {
    docTitle: "Ajouter un produit",
    path: "/admin/add-product",
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct =  (req, res) => {
  new Product (req.body.title).save()
 .then(()=> res.redirect("/"))
}


exports.getProducts = (_, res) => {
  const productsPromise =  Product.fetchAll()
  productsPromise.then((products) => res.render("shop", {
    products: products,
    docTitle: "My e-shop",
    path: "/",
    hasProducts: products.length > 0,
  })) //render call the view engine
};