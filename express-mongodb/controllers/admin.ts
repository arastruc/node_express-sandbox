import { Request, Response } from "express";
import Product from "../models/product";

// const Product = require("../models/product");
// const User = require("../models/user");

export const getAddProduct = async (_: Request, res: Response) => {
  const product = await new Product("title", "url", "decription", 52.32).save();
  console.log("produit", product);
  res.redirect("/");
  // res.render("admin/add-product", {
  //   docTitle: "Ajouter un produit",
  //   path: "/admin/add-product",
  // });
};

// exports.postAddProduct = (req: Request, res: Response) => {
//   //Create product and then link to user
//   // Product.create({ ...req.body })
//   //   .then((product) => req.user.addProduct(product))

//   //Create product from the point of view of user
//   req.user.createProduct({ ...req.body }).then(() => res.redirect("/"));
// };

// exports.getEditProduct = (req: Request, res: Response) => {
//   const edit = req.query.edit;
//   if (edit === "true") {
//     return Product.findByPk(req.params.id).then((product) =>
//       res.render("admin/edit-product", {
//         product: product,
//         docTitle: "Admin Products",
//         path: "/admin/edit-product",
//       })
//     );
//   }
//   return res.redirect("/");
// };

// exports.postEditProduct = (req: Request, res: Response) => {
//   const { id, ...data } = req.body;
//   return Product.update(data, { where: { id: id } }).then(() =>
//     res.redirect("products")
//   );
// };

// exports.deleteProductById = (req: Request, res: Response) => {
//   Product.destroy({ where: { id: req?.params?.id } }).then(() => {
//     res.redirect("/");
//   });
// };

// exports.getProducts = (_: Request, res: Response) => {
//   Product.findAll({
//     include: User,
//   }).then((products) => {
//     res.render("admin/products", {
//       products: products,
//       docTitle: "Admin Products",
//       path: "/admin/products",
//     });
//   });
// };
