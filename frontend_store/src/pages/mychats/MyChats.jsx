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
  const [receiverId, setReceiverId] = useState(null);

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
  const { isLoading, error, data: conversations,refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations/${currentUser._id}`).then((res) => res.data),
  });


  const handleOpenChat = async (chat, autoMessage = null) => {
    setCurrentChat(chat);
    const receiver = chat.members.find((m) => m._id !== currentUser._id);
  setReceiverId(receiver?._id);
    try {
      const res = await newRequest.get(`/messages/${chat._id}`);
      setMessages(res.data);

      if (autoMessage && autoMessage.trim()) {
      // Automatically send the voice message
      const messageObj = {
        conversationId: chat._id,
        sender: currentUser._id,
        text: autoMessage,
      };

      socket.current.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId: receiver?._id,
        text: autoMessage,
      });

      await newRequest.post("/messages", messageObj);
      setMessages(prev => [...prev, messageObj]);
      setNewMessage("");
    }
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };



  useEffect(() => {
  const handleVoiceSendMessage = (e) => {
    if (!conversations) return;

    const { target, msg } = e.detail;
    const lowerTarget = target.toLowerCase();
    const targetUser = conversations.find(chat => {
        const other = chat.members.find(m => m._id !== currentUser._id);
        return other?.username?.toLowerCase() === lowerTarget;
      });
    if (targetUser) {
      handleOpenChat(targetUser, msg); 
    } else {
      alert(`❌ Could not find user "${target}" in your chats.`);
    }
  };

  window.addEventListener("voice-send-message", handleVoiceSendMessage);
  return () =>
    window.removeEventListener("voice-send-message", handleVoiceSendMessage);
}, [conversations]);


  // Setup socket listeners
  useEffect(() => {
    socket.current = getSocket();
    socket.current.emit("addUser", currentUser._id);

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
            conversationId: data.conversationId, // must exist
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
  }, [arrivalMessage,currentChat]);



   useEffect(() => {
    if (!currentChat) return;

    const receiver = currentChat.members.find((m) => m._id !== currentUser._id);
    setReceiverId(receiver?._id);
  }, [currentChat, currentUser]);

  // Detect receiver online status
  useEffect(() => {
    const socket = getSocket();
    socket.emit("addUser", currentUser._id);

    socket.on("getUsers", (users) => {
      if (!receiverId) return;
      const isReceiverOnline = users.some((user) => user.userId === receiverId);
      setIsOnline(isReceiverOnline);
    });

    return () => {
      socket.off("getUsers");
    };
  }, [currentUser, receiverId]);



  // Send message
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat._id,
      sender: currentUser._id,
      text: newMessage,
    };

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await newRequest.post("/messages", message);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      refetch();
    } catch (err) {
      console.log("Message sending failed:", err);
    }
  };

   const [isOnline, setIsOnline] = useState(false);
     useEffect(() => {
    const socket = getSocket();
    // Register current user
    socket.emit("addUser", currentUser._id);
    // Listen for online users updates
    socket.on("getUsers", (users) => {
          if (!receiverId) return;
      const isReceiverOnline = users.some(user => user.userId === receiverId);
      setIsOnline(isReceiverOnline);
    });
    return () => {
      socket.off("getUsers");
    };
  }, [currentUser, receiverId]);


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
              <div className="online-status">
            {isOnline ? (
              <span className="online">Online</span>
            ) : (
              <span className="offline">Offline</span>
            )}
          </div>
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
              <div ref={messagesEndRef} />
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

