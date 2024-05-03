import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },

        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

usersSchema.methods.addToCart = function (product: any) {
  let isUpdated = false;
  let updatedCartItems = this.cart.items.map((cartItem: any) => {
    let { product: productItem, quantity } = cartItem;
    //TO IMPROVE convert all id from database ObjectId to String
    if (productItem.id === product._id.toString()) {
      isUpdated = true;
      quantity++;
    }
    return { ...cartItem, quantity: quantity };
  });
  if (!isUpdated) {
    updatedCartItems.push({
      product: product._id,
      quantity: 1,
    });
  }

  this.cart.items = updatedCartItems;
  this.cart.totalPrice += product.price;

  return this.save();
};

usersSchema.methods.reinitializeCart = function () {
  this.cart = { items: [], totalPrice: 0 };
  return this.save();
};

usersSchema.methods.removeFromCart = function (product_id: string) {
  let cartToDelete = this.cart.items.find(
    (item: any) => product_id === item.product._id.toString()
  );

  let updatedCartItems = this.cart.items.filter(
    (item: any) => product_id !== item.product._id.toString()
  );

  this.cart.items = updatedCartItems;
  this.cart.totalPrice -= cartToDelete.quantity * cartToDelete.product.price;

  return this.save();
};

export default mongoose.model("User", usersSchema);

// import { ObjectId } from "mongodb";
// // import { getDb } from "../config/mongodb";
// import Product from "./product";
// import Cart from "./cart";
// import Order from "./order";

// class User {
//   id!: string;
//   name!: string;
//   email!: string;
//   cart!: Cart;

//   static from(json: any): User {
//     const { id, name, email, cart } = json;
//     return Object.assign(new User(), {
//       id,
//       name,
//       email,
//       cart,
//     });
//   }

//   static findByName(name: string) {
//     // const db = getDb();
//     // return db
//     //   .collection("users")
//     //   .findOne({ name: name })
//     //   .then((user) => {
//     //     return { ...user, id: user?._id.toString(), _id: undefined };
//     //   });
//   }

//   static findById(id: string) {
//     // const db = getDb();
//     // return db
//     //   .collection("users")
//     //   .findOne(new ObjectId(id))
//     //   .then((user) => {
//     //     return { ...user, id: user?._id, _id: undefined };
//     //   });
//   }

//   save() {
//     // const db = getDb();
//     // return db.collection("users").insertOne(this);
//   }

//   update() {
//     // const db = getDb();
//     // return db
//     //   .collection("users")
//     //   .updateOne({ _id: new ObjectId(this.id) }, { $set: this })
//     //   .catch(console.log);
//   }

//

//   removeFromCart(productId: string) {
//     const db = getDb();

//     let updatedCartItems = this.cart.items.filter(
//       ({ product_id }) => product_id !== productId
//     );

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this.id) },
//         { $set: { cart: new Cart(updatedCartItems) } }
//       );
//   }

//   addOrder() {
//     return Order.from({ ...this.cart, userId: this.id, id: undefined })
//       .save()
//       .then(() => User.from({ ...this, cart: new Cart([]) }).update());
//   }
// }
// export default User;
