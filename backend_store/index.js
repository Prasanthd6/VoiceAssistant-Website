import http from "http";
import { initSocket } from "./utils/socket.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import gigRoute from "./routes/gigRoute.js";
import orderRoute from "./routes/orderRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import messageRoute from "./routes/messageRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const server = http.createServer(app);
initSocket(server);


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ 
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
// app.post('/voice', (req, res) => {
//   const command = req.body.command;
//   console.log("Received voice command:", command);

//   // Here you can add your logic to interpret command or perform something
//   return res.json({ message: `Received command: ${command}` });
// });
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});


// app.listen(8800, () => {
//   connect();
//   console.log("Backend server is running!");
// });
server.listen(8800, () => {
  connect(); // ⬅️ Still call MongoDB connect
  console.log("Backend server is running on port 8800");
});




////////////////////////////////////////////////


// import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import cors from "cors";
// import worksroute from "./routes/worksroute.js";
// import auth from "./routes/auth.js";
// import cookieParser from "cookie-parser";
// import path from "path";
// import uploadRoute from './routes/uploadRoute.js';
// import { fileURLToPath } from "url";

// const app = express();
// app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173',
//     credentials:true,
//   methods: ['GET','POST','PUT','DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));
// app.use(cookieParser());

// app.get('/',(req, res) =>{
// console.log(req)
// return res.status(234).send('Welcome to home');
// });

// app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

// app.use("/auth",auth);
// app.use('/api/upload',uploadRoute);
// app.use('/api/works',worksroute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App connected to database");
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`)
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

