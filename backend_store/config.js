import dotenv from "dotenv";
dotenv.config();

export const PORT = 5555;
export const mongoDBURL = "mongodb+srv://prasanth:va0i5PiiArbqjDBy@cluster0.xtk8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export const JWT_SECRET = process.env.JWT_SECRET;