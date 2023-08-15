import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  message: {
    type: [],
    require: true,
  },
});

const ChatModel = mongoose.model("messages", chatSchema);
export default ChatModel;
