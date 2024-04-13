const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (_, res) => {
  Product.findAll().then((products) =>
    res.render("shop/products", {
      products: products,
      docTitle: "My products",
      path: "/products",
    })
  );
};

exports.getProductById = (req, res) => {
  Product.findByPk(req?.params?.id).then((product) =>
    res.render("shop/product-detail", {
      product: product,
      docTitle: "My product detail",
      path: "/product-detail",
    })
  );
};

exports.getIndex = (_, res) => {
  Product.findAll().then((products) =>
    res.render("shop/index", {
      products: products,
      docTitle: "Shop",
      path: "/",
    })
  );
};

exports.getCart = (req, res) => {
  // return Cart.findOne({
  //   where: {
  //     userId: req.user.id,
  //   },
  //   include: Product,
  // })
  return req.user
    .getCart({
      include: {
        model: Product,
        //Precise attribute we want from the joining table (in this cas nothing)
        // through: {
        //   attributes: [],
        // },
      },
    })
    .then(({ totalPrice, products }) =>
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        products: products,
        price: totalPrice,
      })
    );
};

exports.deleteProductFromCart = async (req, res) => {
  const cart = await req.user.getCart({ include: Product });
  const { totalPrice, products } = cart;

  let matching_product = products.find(({ id }) => id === req?.body?.productId);

  return cart
    .removeProduct(matching_product)
    .then(() =>
      cart.update({
        totalPrice:
          totalPrice -
          matching_product.price * matching_product.cartItem.quantity,
      })
    )
    .then(() => res.redirect("/cart"));
};

exports.addCart = async (req, res) => {
  const product = await Product.findByPk(req?.body?.productId);
  const cart = await req.user.getCart({ include: Product });

  const { totalPrice, products } = cart;

  let matching_product = products.find(({ id }) => id === req?.body?.productId);
  let quantity = 1;

  if (matching_product) {
    quantity = ++matching_product.cartItem.quantity;
  }

  return cart
    .addProduct(product, {
      through: { quantity: quantity },
    })
    .then(() => cart.update({ totalPrice: totalPrice + product.price }))
    .then(() => res.redirect("/cart"));
};

exports.getOrders = (req, res) => {
  req.user.getOrders({ include: Product }).then((orders) =>
    res.render("shop/orders", {
      docTitle: "Your orders",
      path: "/orders",
      orders: orders,
    })
  );
};

exports.addOrder = async (req, res) => {
  const cart = await req.user.getCart({
    include: {
      model: Product,
    },
  });

  const { totalPrice, products } = cart;

  const order = await req.user.createOrder({
    totalPrice: totalPrice,
  });

  return order
    .addProducts(products)
    .then(cart.removeProducts(products))
    .then(() => cart.update({ totalPrice: 0 }))
    .then(() => res.redirect("/orders"));
};

exports.getIndex = (_, res) => {
  Product.findAll().then((products) =>
    res.render("shop/index", {
      products: products,
      docTitle: "Shop",
      path: "/",
    })
  );
};

exports.getCheckout = (_, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/cart",
  });
};
