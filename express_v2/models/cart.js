const fs = require("fs").promises;
const pathDir = require("../util/path");

const p = `${pathDir}/data/cart.json`;

const getCartFromFile = () => {
  console.log(p);
  return fs.readFile(p).then((fileContent) => JSON.parse(fileContent));
};

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

  static builder() {
    return Object.assign(new Cart(), getCartFromFile());
  }

  static addProduct({ id, price }) {
    return getCartFromFile()
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
          cart.products.push({ id: id, quantity: 1 });
        }
        cart.totalPrice += +price;
        return cart;
      })
      .then(saveCartInFile)
      .catch(console.log);
  }
};
