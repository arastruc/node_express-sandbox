import { Request, Response } from "express";
import Product from "../models/product";

export const getAddProduct = async (_: Request, res: Response) => {
  return res.render("admin/add-product", {
    docTitle: "Ajouter un produit",
    path: "/admin/add-product",
  });
};

export const postAddProduct = (req: Request, res: Response) => {
  return Product.from({
    ...req.body,
    price: +req?.body?.price,
    userId: req.body?.userId,
  })
    .save()
    .then(() => res.redirect("/"))
    .catch(() => console.log);
};

export const getEditProduct = (req: Request, res: Response) => {
  const edit = req.query.edit;
  if (edit === "true") {
    return Product.findById(req.params.id).then((product: unknown) =>
      res.render("admin/edit-product", {
        product: product,
        docTitle: "Admin Products",
        path: "/admin/edit-product",
      })
    );
  }
  return res.redirect("/");
};

export const postEditProduct = (req: Request, res: Response) => {
  console.log(req.body);
  return Product.from(req.body)
    .update()
    .then(() => res.redirect("products"));
};

export const deleteProductById = (req: Request, res: Response) => {
  return Product.deleteById(req?.params?.id).then(() => {
    res.redirect("/");
  });
};

export const getProducts = (_: Request, res: Response) => {
  return Product.findAll()
    .then((products: any) => {
      res.render("admin/products", {
        products: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(console.log);
};
