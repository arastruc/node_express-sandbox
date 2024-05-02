import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },
  },

  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);
