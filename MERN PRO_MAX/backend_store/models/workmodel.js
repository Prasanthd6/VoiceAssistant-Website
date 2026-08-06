import mongoose from "mongoose";

const workSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, // image URL
      required :false
    },
    bannerPic: {
      type: String, // image URL
      required: false
    },
    bio: {
      type: String,
    },
    skills: {
      type: [String], // array of skills
    },
    price: {
      type: Number, // or String if you need formats like "$20/hr"
    },
    location: {
      type: String,
    },
    pincode: {
      type: Number,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Work', workSchema);

// export const Work = mongoose.model('Cat', workSchema);