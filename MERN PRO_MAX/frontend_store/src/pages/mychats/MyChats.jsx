
// import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import newRequest,{ getSocket } from "../../utils/newRequest";
// import "./MyChats.css"; // optional styling import
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../../redux/userSlice";

// const MyChats = () => {
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // ✅ get logged-in user from localStorage or Redux
//   // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const currentUser = useSelector((state) => state.user.currentUser);
//   useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//   if (storedUser) {
//     dispatch(updateUser(storedUser));
//   }
// }, []);


//   // ✅ fetch conversations
//   const { isLoading, error, data: conversations } = useQuery({
//     queryKey: ["conversations"],
//     queryFn: () =>
//       newRequest
//         .get(`/conversations/${currentUser._id}`)
//         .then((res) => res.data),  
//   });
//   console.log("Redux currentUser", currentUser);
// console.log("Fetched conversations", conversations);


//   // ✅ socket listeners
//   useEffect(() => {
//     const socket = getSocket();

//     socket.emit("addUser", currentUser._id); // register on socket server

//     socket.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });

//     return () => {
//       socket.off("getMessage");
//     };
//   }, [currentUser._id]);

//   // ✅ auto-add incoming message to chat
//   useEffect(() => {
//     if (
//       arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender)
//     ) {
//       setMessages((prev) => [...prev, arrivalMessage]);
//     }
//   }, [arrivalMessage, currentChat]);

//   // ✅ fetch messages when a chat is selected
//   const handleOpenChat = async (chat) => {
//     setCurrentChat(chat);
//     try {
//       const res = await newRequest.get(`/messages/${chat._id}`);
//       setMessages(res.data);
//     } catch (err) {
//       console.error("Failed to load messages", err);
//     }
//   };

//   // ✅ send message
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const message = {
//       conversationId: currentChat._id,
//       sender: currentUser._id,
//       text: newMessage,
//     };

//     const socket = getSocket();
//     const receiverId = currentChat.members.find(
//       (m) => m._id !== currentUser._id
//     );

//     socket.emit("sendMessage", {
//       senderId: currentUser._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await newRequest.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log("Message sending failed:", err);
//     }
//   };

//   return (
//     <div className="myChatsPage">
//       <div className="chatList">
//         <h3>My Conversations</h3>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error loading chats</p>
//         ) : (
//           conversations.map((c) => {
//             const other = c.members.find((m) => m._id?.toString() !== currentUser._id?.toString());
//             console.log("Other user from chat:", other);
//             return (
//               <div
//                 className={`chatListItem ${currentChat?._id === c._id ? "active" : ""}`}
//                 key={c._id}
//                 onClick={() => handleOpenChat(c)}
//               >
//                 <div className="chatListHeader">
//                 <img
//                     src={other.img || "/img/noavatar.jpg"}
//                     alt=""
//                     className="chatListAvatar"
//                   />
//                 <span>{other.username || "User"}</span>
//                 </div>
//                 <p>{c.lastMessage?.text?.slice(0, 20) || "No messages yet"}</p>
//               </div>
//             );
//           })
//         )}
//       </div>

//       <div className="chatWindow">
//         {currentChat ? (
//           <>
//             <div className="chatHeader">
//               <strong>
//                 {
//                   currentChat.members.find((m) => m._id !== currentUser._id)
//                     ?.username
//                 }
//               </strong>
//             </div>
//             <div className="chatMessages">
//               {messages.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   className={
//                     msg.sender === currentUser._id
//                       ? "message own"
//                       : "message"
//                   }
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>
//             <form className="chatInput" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button type="submit">Send</button>
//             </form>
//           </>
//         ) : (
//           <p className="noChat">Select a conversation to start chatting</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyChats;


import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest, { getSocket } from "../../utils/newRequest";
import "./MyChats.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

const MyChats = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useRef();
  const messagesEndRef = useRef(null);

  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(() => {
 if (messagesEndRef.current) {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);


  // Rehydrate user from localStorage if needed
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      dispatch(updateUser(storedUser));
    }
  }, []);

  // Fetch conversations
  const { isLoading, error, data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations/${currentUser._id}`).then((res) => res.data),
    enabled: !!currentUser?._id, // Only fetch if user exists
  });

  // Setup socket listeners
  useEffect(() => {
    socket.current = getSocket();
    socket.current.emit("addUser", currentUser._id);

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current.off("getMessage");
    };
  }, [currentUser._id]);

  // Add incoming message to current chat
  useEffect(() => {
    if (!arrivalMessage || !currentChat) return;

    const senderInChat = currentChat.members.some(
      (m) => m._id === arrivalMessage.sender
    );

    if (senderInChat) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  // Load messages when selecting a chat
  const handleOpenChat = async (chat) => {
    setCurrentChat(chat);
    try {
      const res = await newRequest.get(`/messages/${chat._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  // Send message
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat._id,
      sender: currentUser._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (m) => m._id !== currentUser._id
    )?._id;

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await newRequest.post("/messages", message);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log("Message sending failed:", err);
    }
  };

  return (
    <div className="myChatsPage">
      <div className="chatList">
        <h3>My Chats</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading chats</p>
        ) : (
          conversations.map((c) => {
            const other = c.members.find((m) => m._id !== currentUser._id);
            return (
              <div
                className={`chatListItem ${currentChat?._id === c._id ? "active" : ""}`}
                key={c._id}
                onClick={() => handleOpenChat(c)}
              >
                <div className="chatListHeader">
                  <img
                    src={other?.img || "/img/noavatar.jpg"}
                    alt=""
                    className="chatListAvatar"
                  />
                  <span>{other?.username || "User"}</span>
                </div>
                <p>{c.lastMessage?.text?.slice(0, 20) || "No messages yet"}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="chatWindow">
        {currentChat ? (
          <>
            <div className="chatHeader">
              <strong>
                {
                  currentChat.members.find((m) => m._id !== currentUser._id)
                    ?.username
                }
              </strong>
            </div>
            <div className="chatMessages" ref={messagesEndRef}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.sender === currentUser._id ? "message own" : "message"
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="chatInput" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <p className="noChat">Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default MyChats;
