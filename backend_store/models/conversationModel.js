import mongoose from "mongoose";
import User from "../models/userModel.js";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      ref: "User",
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: "",
    },
    groupAdmin: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);