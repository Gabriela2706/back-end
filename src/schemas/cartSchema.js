import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    default: "Cliente anonimo",
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    default: [],
    quantity: Number,
    default: 1,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

cartSchema.pre("find", function () {
  this.populate("products.product");
});
export default cartModel;
