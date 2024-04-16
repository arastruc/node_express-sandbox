import { getDb } from "../config/mongodb";
import ProductItem from "./product-item";

class Order {
  id!: string;
  totalPrice!: number;
  items!: Array<ProductItem>;
  userId!: string;

  static from(json: any) {
    const { id, totalPrice, items, userId } = json;
    return Object.assign(new Order(), {
      id,
      totalPrice,
      items,
      userId,
    });
  }

  static findAllFromUser(userId: string) {
    const db = getDb();
    console.log("userid", userId);
    return db
      .collection("orders")
      .find({ userId: userId })
      .toArray()
      .then((orders) => {
        console.log("ordre", orders);
        return orders.map((order) => {
          return { ...order, id: order?._id.toString(), _id: undefined };
        });
      });
  }

  save() {
    const db = getDb();
    return db.collection("orders").insertOne(this);
  }
}

export default Order;
