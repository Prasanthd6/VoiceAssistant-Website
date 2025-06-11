import axios from "axios";
import { io } from "socket.io-client";
import { SOCKET_URL,BASE_API_URL } from "../../config";
const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // Don't connect immediately
});
export const getSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
  return socket;
};

const newRequest = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

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



// import axios from "axios";
// import { io } from "socket.io-client";
// import { SOCKET_URL, BASE_API_URL } from "../../config.js"; 

// const socket = io("http://localhost:8800", {
//   withCredentials: true,
//   autoConnect: false, // Don't connect immediately
// });
// export const getSocket = () => {
//   if (!socket.connected) {
//     socket.connect();
//   }
//   return socket;
// };

// const newRequest = axios.create({
//   baseURL: "http://localhost:8800/api",
//   withCredentials: true,
// });

// newRequest.interceptors.request.use(
//   (config) => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (currentUser?.token) {
//       config.headers.Authorization = `Bearer ${currentUser.token}`;
//       // Also add token to socket if not already connected
//       if (!socket.connected && currentUser.token) {
//         socket.auth = { token: currentUser.token };
//         socket.connect();
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default newRequest;
