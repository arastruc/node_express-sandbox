import { Request, Response } from "express";
import Product from "../models/product";

export const getAddProduct = async (_: Request, res: Response) => {
  return res.render("admin/add-product", {
    docTitle: "Ajouter un produit",
    path: "/admin/add-product",
  });
};

export const postAddProduct = (req: Request, res: Response) => {
  return new Product({
    ...req.body,
    price: +req?.body?.price,
    userId: req.body?.user,
  })
    .save()
    .then(() => res.redirect("/"))
    .catch(console.log);
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
  const id = req.body.id as string;
  return Product.findByIdAndUpdate(id, { ...req.body }).then(() =>
    res.redirect("products")
  );
};

export const deleteProductById = (req: Request, res: Response) => {
  const id = req?.params?.id as string;
  return Product.findByIdAndDelete(id).then(() => {
    res.redirect("/");
  });
};

export const getProducts = (_: Request, res: Response) => {
  return Product.find()
    .then((products: any) => {
      res.render("admin/products", {
        products: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(console.log);
};
