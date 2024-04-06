const fs = require("fs").promises;
const pathDir = require("../util/path");

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
  constructor(title) {
    this.title = title;
  }

  save() {
    return getProductsFromFile()
      .then((products) => {
        return [...products, this];
      })
      .then(saveProductListInFile)
      .catch(console.log);
  }

  static fetchAll() {
    return getProductsFromFile().catch(console.log);
  }
};
