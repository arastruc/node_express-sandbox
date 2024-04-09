const fs = require("fs").promises;
const pathDir = require("../util/path");

const p = `${pathDir}/data/cart.json`;

const saveCartInFile = (cart) => {
  return fs.writeFile(p, JSON.stringify(cart), (err) => {
    err && console.log(err);
  });
};

module.exports = class Cart {
  constructor() {
    this.products = products;
    this.totalPrice = totalPrice;
  }

  static fetchAll = () => {
    return fs
      .readFile(p)
      .then((fileContent) => JSON.parse(fileContent))
      .catch(console.log);
  };

  static builder() {
    return Object.assign(new Cart(), Cart.fetchAll());
  }

  static addProduct({ id, price, title }) {
    return Cart.fetchAll()
      .then((cart) => {
        let isUpdated = false;

        if (cart.products.length !== 0) {
          cart.products = cart.products.map((product) => {
            if (product.id === id) {
              product.quantity += 1;
              isUpdated = true;
            }
            return product;
          });
        }
        if (!isUpdated) {
          cart.products.push({ id: id, quantity: 1, title: title });
        }
        cart.totalPrice += +price;
        return cart;
      })
      .then(saveCartInFile)
      .catch(console.log);
  }

  static deleteProductFromCart({ id, price }) {
    let quantityOfProduct = 0;
    return Cart.fetchAll()
      .then((cart) => {
        cart.products = cart.products.filter((product) => {
          if (product.id === id) {
            quantityOfProduct = product.quantity;
            return false;
          } else {
            return true;
          }
        });

        cart.totalPrice -= +price * quantityOfProduct;
        return cart;
      })
      .then(saveCartInFile)
      .catch(console.log);
  }
};
