import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: {
    type: [],
  },
});

const CartModel = mongoose.model("cart", cartSchema);
export default CartModel;
