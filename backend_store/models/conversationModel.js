// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const ConversationSchema  = new Schema(
//   {
//      id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     sellerId: {
//       type: String,
//       required: true,
//     },
//     buyerId: {
//       type: String,
//       required: true,
//     },
//     readBySeller: {
//       type: Boolean,
//       required: true,
//     },
//     readByBuyer: {
//       type: Boolean,
//       required: true,
//     },
//     lastMessage: {
//       type: String,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Conversation", ConversationSchema);
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