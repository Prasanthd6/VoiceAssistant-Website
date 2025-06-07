
// import { Server } from "socket.io";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//       credentials:true,
//     },
//   });

//   io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     if (user) {
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("a user disconnected");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

//   return io;
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("Socket.io not initialized!");
//   }
//   return io;
// };
import { Server } from "socket.io";

let io;
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some(user => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find(user => user.userId === userId);
};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
