import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "visit"],
    default: "visit",
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
