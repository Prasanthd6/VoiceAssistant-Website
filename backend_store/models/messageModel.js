import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    readBy: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);