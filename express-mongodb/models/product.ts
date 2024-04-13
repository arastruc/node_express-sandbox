import { getDb } from "../config/mongodb";

class Product {
  title: Required<String>;
  imageurl: Required<String>;
  description: Required<String>;
  price: Required<number>;

  constructor(
    title: String,
    imageurl: String,
    description: String,
    price: number
  ) {
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = +price;
  }

  save() {
    const db = getDb();
    return db.collection("products").insertOne(this).catch(console.log);
  }
}
export default Product;
