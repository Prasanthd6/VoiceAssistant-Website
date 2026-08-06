import dotenv from "dotenv";
dotenv.config();

export const PORT = 5555;
// Direct MongoDB Atlas connection with correct credentials
export const mongoDBURL = "mongodb://prasanth:OP1yrw02qvP6pwp2@cluster0-shard-00-00.xtk8c.mongodb.net:27017,cluster0-shard-00-01.xtk8c.mongodb.net:27017,cluster0-shard-00-02.xtk8c.mongodb.net:27017/?ssl=true&replicaSet=atlas-z6f2sb-shard-0&authSource=admin&appName=Cluster0";
export const JWT_SECRET = process.env.JWT_SECRET || "domate_secret_key_2024";

// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dqjyxvd7d";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "cAmi5dnVUvJz0B_6tV3dptBiCHg";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "984478797188969";