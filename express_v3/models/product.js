const fs = require("fs").promises;
const pathDir = require("../util/path");
const uuid = require("uuid");
const Cart = require("./cart");

const p = `${pathDir}/data/product.json`;

const getProductsFromFile = () => {
  return fs.readFile(p).then((fileContent) => {
    return JSON.parse(fileContent);
  });
};

const saveProductListInFile = (products) => {
  return fs.writeFile(p, JSON.stringify(products), (err) => {
    err && console.log(err);
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static from(json) {
    return Object.assign(new Product(), json);
  }

  save() {
    return getProductsFromFile()
      .then((products) => {
        this.id = uuid.v4();
        return [...products, this];
      })
      .then(saveProductListInFile)
      .catch(console.log);
  }

  static fetchAll() {
    return getProductsFromFile().catch(console.log);
  }

  static fetchById(productId) {
    return getProductsFromFile()
      .then((products) => products.find(({ id }) => id === productId))
      .catch(console.log);
  }

  update() {
    return getProductsFromFile()
      .then((products) => {
        return products.map((product) => {
          return product.id === this.id ? this : product;
        });
      })
      .then((products) => {
        saveProductListInFile(products);
        return products;
      })
      .catch(console.log);
  }

  static deleteById(productId) {
    return Product.fetchById(productId)
      .then(Cart.deleteProductFromCart)
      .then(getProductsFromFile)
      .then((products) => products.filter(({ id }) => id !== productId))
      .then(saveProductListInFile)
      .catch(console.log);
  }
};
