// import axios from "axios";

// ////////////////////////
// // const newRequest = axios.create({
// //   baseURL: "http://localhost:8800/api/",
// //   withCredentials: true,
// // });
// /////////////////////////

// const newRequest = axios.create({
//   baseURL: "http://localhost:8800/api",
//   withCredentials: true,
// });

// export default newRequest;




// utils/newRequest.js
import axios from "axios";
import { io } from "socket.io-client";



// Socket.io client setup
const socket = io("http://localhost:8800", {
  withCredentials: true,
  autoConnect: false, // Don't connect immediately
});
// Function to get socket instance and ensure connection
export const getSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
};





// Create base axios instance
const newRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

// Add request interceptor to dynamically add token
newRequest.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      config.headers.Authorization = `Bearer ${currentUser.token}`;
      // Also add token to socket if not already connected
      if (!socket.connected && currentUser.token) {
        socket.auth = { token: currentUser.token };
        socket.connect();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;
