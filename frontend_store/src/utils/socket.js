// utils/socket.js
import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  socket = io("http://localhost:8800");
  socket.emit("joinRoom", userId);
  return socket;
};

export const getSocket = () => socket;
