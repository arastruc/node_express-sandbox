import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";

class Product {
  id!: string;
  title!: string;
  imageurl!: string;
  description!: string;
  price!: number;
  userId!: string;

  // constructor(
  //   title: string,
  //   imageurl: string,
  //   description: string,
  //   price: number
  // ) {
  //   this.title = title;
  //   this.imageurl = imageurl;
  //   this.description = description;
  //   this.price = +price;
  // }

  static from(json: any) {
    const { id, title, imageurl, description, price, userId } = json;
    return Object.assign(new Product(), {
      id,
      title,
      imageurl,
      description,
      price,
      userId,
    });
  }

  static findAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return { ...product, id: product?._id.toString(), _id: undefined };
        });
      });
  }

  static findById(id: string) {
    const db = getDb();
    return db
      .collection("products")
      .findOne(new ObjectId(id))
      .then((product) => {
        return { ...product, id: product?._id.toString(), _id: undefined };
      });
    //alternative
    // .find(new ObjectId(id)).next()
  }

  static deleteById(id: string) {
    const db = getDb();
    return db.collection("products").deleteOne({ _id: new ObjectId(id) });
  }

  update() {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new ObjectId(this.id) }, { $set: this })
      .catch(console.log);
  }

  save() {
    const db = getDb();
    return db.collection("products").insertOne(this);
  }
}
export default Product;
