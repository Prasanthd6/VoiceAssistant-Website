import axios from "axios";
import { io } from "socket.io-client";


const socket = io("http://localhost:8800", {
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
  baseURL: "http://localhost:8800/api",
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
