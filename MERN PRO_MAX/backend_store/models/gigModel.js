// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const GigSchema = new Schema(
//   {
//    userId: {
//       type: String,
//       required: true,
//     },
//       title: {
//       type: String,
//       required: true,
//     },
//     desc: {
//       type: String,
//       required: true,
//     },
//     totalStars: {
//       type: Number,
//       default: 0,
//     },
//     starNumber: {
//       type: Number,
//       default: 0,
//     },
//     cat: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     cover: {
//       type: String,
//       required: true,
//     },
//     images: {
//       type: [String],
//       required: false,
//     },
//     userId: {
//       type: String,
//       required: true,
//     },
//     shortTitle: {
//       type: String,
//       required: true,
//     },
//     shortDesc: {
//       type: String,
//       required: true,
//     },
//     deliveryTime: {
//       type: Number,
//       required: true,
//     },
//     revisionNumber: {
//       type: Number,
//       required: true,
//     },
//     features: {
//       type: [String],
//       required: false,
//     },
//     sales: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Gig", GigSchema);
import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0, // Optional: used for sorting/filtering
    },
    customService: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
