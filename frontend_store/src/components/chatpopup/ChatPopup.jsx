import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest, { getSocket } from "../../utils/newRequest";
import "./ChatPopup.css";

const ChatPopup = ({ currentUser, receiverId, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);

   useEffect(() => {
   if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    }, [messages]);
  
  // 1. Initialize socket connection and track online status
  useEffect(() => {
    const socket = getSocket();
    
    // Register current user
    socket.emit("addUser", currentUser._id);
    
    // Listen for online users updates
    socket.on("getUsers", (users) => {
      const isReceiverOnline = users.some(user => user.userId === receiverId);
      setIsOnline(isReceiverOnline);
    });

    return () => {
      socket.off("getUsers");
    };
  }, [currentUser, receiverId]);

  // 2. Fetch or create conversation
  const { isLoading: isLoadingConversation, data: conversationData } = useQuery({
    queryKey: ["conversation", receiverId],
    queryFn: () =>
      newRequest.post("/conversations", {
        senderId: currentUser._id,
        receiverId: receiverId,
      }).then(res => res.data),
  });

  // 3. Fetch messages when conversation is available
  const { isLoading: isLoadingMessages, data: messagesData } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () =>
      newRequest.get(`/messages/${conversationId}`).then(res => res.data),
    enabled: !!conversationId,
  });

  // 4. Set conversation ID when data loads
  useEffect(() => {
    if (conversationData) {
      setConversationId(conversationData._id);
    }
  }, [conversationData]);

  // 5. Set messages when data loads
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  // 6. Setup real-time messaging
  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocket();

    socket.emit("joinConversation", conversationId);
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversationId]);

  // 7. Message mutation
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post("/messages", {
        conversationId,
        sender: currentUser._id,
        text: message,
      });
    },
    onSuccess: (data) => {
      const socket = getSocket();
      socket.emit("sendMessage", {
        conversationId,
        message: data.data
      });
          queryClient.invalidateQueries(["conversations"]);
      setMessage("");
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    mutation.mutate(message);
  };
  
  useEffect(() => {
  const handleAutoSend = (e) => {
    const message = e.detail;
    if (message && message.trim()) {
      mutation.mutate(message); // your existing mutation
    }
  };
  window.addEventListener("auto-chat-message", handleAutoSend);
  return () => window.removeEventListener("auto-chat-message", handleAutoSend);
}, []);


  return (
    <div className="chat-popup">
      <div className="chat-header">
        <div className="user-info">
          <h3>Chat</h3>
          <div className="online-status">
            {isOnline ? (
              <span className="online">Online</span>
            ) : (
              <span className="offline">Offline</span>
            )}
          </div>
        </div>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      </div>
      
      <div className="chat-messages">
        {isLoadingMessages ? (
          <div className="loads">Loading messages...</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id || msg.createdAt}
              className={`message ${
                msg.sender === currentUser._id ? "sent" : "received"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))
        )}
        
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPopup;

