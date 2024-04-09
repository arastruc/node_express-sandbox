const fs = require("fs").promises;
const pathDir = require("../util/path");
const uuid = require("uuid");
const Cart = require("./cart");
const db = require("../config/postgre-config");

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
  constructor(title, imageurl, description, price) {
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = +price;
  }

  static from(json) {
    return Object.assign(new Product(), json);
  }

  save() {
    return db.query(
      `INSERT INTO product VALUES('${uuid.v4()}','${this.title}','${
        this.imageurl
      }','${this.description}',${+this.price});`
    );
  }

  static fetchAll() {
    return db.query("Select * from product;").then(({ rows }) => rows);
  }

  static fetchById(productId) {
    return db
      .query(`Select * from product WHERE id = '${productId}';`)
      .then(({ rows }) => (rows.length ? rows[0] : {}));
  }

  update() {
    return db.query(
      `UPDATE product
       SET title = '${this.title}', imageurl = '${
        this.imageurl
      }', description = '${this.description}', price = '${+this.price}'
       WHERE id = '${this.id}'`
    );
  }

  //   return getProductsFromFile()
  //     .then((products) => {
  //       return products.map((product) => {
  //         return product.id === this.id ? this : product;
  //       });
  //     })
  //     .then((products) => {
  //       saveProductListInFile(products);
  //       return products;
  //     })
  //     .catch(console.log);
  // }

  static deleteById(productId) {
    return Product.fetchById(productId)
      .then(Cart.deleteProductFromCart)
      .then(getProductsFromFile)
      .then((products) => products.filter(({ id }) => id !== productId))
      .then(saveProductListInFile)
      .catch(console.log);
  }
};
