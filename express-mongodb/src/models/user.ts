import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import Product from "./product";
import Cart from "./cart";
import Order from "./order";

class User {
  id!: string;
  name!: string;
  email!: string;
  cart!: Cart;

  static from(json: any): User {
    const { id, name, email, cart } = json;
    return Object.assign(new User(), {
      id,
      name,
      email,
      cart,
    });
  }

  static findByName(name: string) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ name: name })
      .then((user) => {
        return { ...user, id: user?._id.toString(), _id: undefined };
      });
  }

  static findById(id: string) {
    const db = getDb();
    return db
      .collection("users")
      .findOne(new ObjectId(id))
      .then((user) => {
        return { ...user, id: user?._id, _id: undefined };
      });
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  update() {
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: new ObjectId(this.id) }, { $set: this })
      .catch(console.log);
  }

  addToCart(product: Product) {
    const db = getDb();
    let isUpdated = false;

    let updatedCartItems = this.cart.items.map((cartItem) => {
      let { product_id, quantity } = cartItem;

      //TO IMPROVE convert all id from database ObjectId to String
      if (product.id === product_id.toString()) {
        isUpdated = true;
        quantity++;
      }

      return { ...cartItem, quantity: quantity };
    });
    if (!isUpdated) {
      updatedCartItems.push({
        product_id: product.id,
        product_price: product.price,
        quantity: 1,
        product_title: product.title,
      });
    }

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { cart: new Cart(updatedCartItems) } }
      );
  }

  removeFromCart(productId: string) {
    const db = getDb();

    let updatedCartItems = this.cart.items.filter(
      ({ product_id }) => product_id !== productId
    );

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { cart: new Cart(updatedCartItems) } }
      );
  }

  addOrder() {
    return Order.from({ ...this.cart, userId: this.id, id: undefined })
      .save()
      .then(() => User.from({ ...this, cart: new Cart([]) }).update());
  }
}
export default User;
