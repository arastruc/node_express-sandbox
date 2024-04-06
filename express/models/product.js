const fs = require ("fs").promises
const pathDir = require("../util/path")


const p = `${pathDir}/data/product.json`
module.exports = class Product {
    constructor(title) {
      this.title = title;
    }

    save(){
        let products = []
      return fs.readFile(p)
        .then((fileContent) => {
                products = JSON.parse(fileContent)
                products.push(this);
                return products;})
        .then((products) => {
            fs.writeFile(
                  p,
                   JSON.stringify(products),
                    (err) => {
                      err && console.log(err);
                    }
                  )
                  console.log("prommesse", products)
        }
        )
        .catch((console.log))
        
    }

    static fetchAll(){
        return fs.readFile(p)
        .then((fileContent) => {
            console.log("toto",fileContent);
            return JSON.parse(fileContent)})
        .catch(console.log)} 
    }
  
  