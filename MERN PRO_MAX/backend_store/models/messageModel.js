// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const MessageSchema = new Schema(
//   {
//     conversationId: {
//       type: String,
//       required: true,
//     },
//     userId: {
//     type: String,
//     required: true,
//   },
//   desc: {
//     type: String,
//     required: true,
//   },
// },
// {
//   timestamps:true
// }
  
// );

// export default mongoose.model("Message", MessageSchema)

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