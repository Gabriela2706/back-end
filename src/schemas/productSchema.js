import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  thmbnail: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});
const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
