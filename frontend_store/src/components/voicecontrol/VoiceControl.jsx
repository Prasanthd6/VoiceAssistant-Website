import axios from 'axios';
import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastCommandRef = useRef("");


const handleCommand = async (command) => {
    console.log("Sending voice command to backend:", command); 
    try{
  const res = await axios.post("http://localhost:8000/command", { text: command });
  const { action, path, query, target, msg, field, value,element } = res.data;

  switch (action) {
    case "navigate":
      navigate(path);
      break;
    case "logout":
      dispatch(logout());
      navigate("/");
      break;
    case "search":
    navigate(`/gigs?search=${encodeURIComponent(query)}`);
      break;
    case "fill":
  // Trigger a custom event to update React state
  window.dispatchEvent(
    new CustomEvent("voice-fill", {
      detail: { field, value },
    })
  );

  // Optional: update input value visually
  const input = document.getElementById(field);
  if (input) {
    input.value = value;
  }
  break;


    case "message":
    window.dispatchEvent(
      new CustomEvent("voice-send-message", {
        detail: {
          target, msg,
        },
      })
    );
    break;

    case "click":
      const btn = document.getElementById(element);
      if (btn) {
        btn.click();
      } else {
        alert("Button not found.");
      }
      break;

    case "open_gig_number":
      const gigLinks = document.querySelectorAll(".cards .link");
      const i = res.data.index - 1; // Convert to 0-based index

      if (i >= 0 && i < gigLinks.length) {
        gigLinks[i].click(); // Clicks the gig link
      } else {
        alert(`No gig found at number ${res.data.index}`);
      }
      break;

    case "contact_seller":
    document.getElementById("contactButton")?.click(); // Or trigger setShowPopup(true)
    break;
    
     case "send_to_seller":
    window.dispatchEvent(
      new CustomEvent("auto-chat-message", {
        detail: msg,
      })
    );
    break;

    case "go_back":
      window.history.back();
      break;
    default:
      alert("Can you please say again clearly");
  }
}catch(err){
      console.error("❌ Command handling error:", err);
}
};
const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support Speech Recognition.");
      return;
    }
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
       recognition.onresult = (event) => {
       const lastIndex = event.results.length - 1;
      const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
        console.log("🎤Heard:", transcript);

        // Prevent repeating the same command
        if (transcript === lastCommandRef.current) return;
        lastCommandRef.current = transcript;
        handleCommand(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
      console.log("Recognition ended");
      if (isListening) {
        recognition.start(); // auto-restart unless manually stopped
      }
    };

      recognitionRef.current = recognition;
    }
    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      console.log("Started listening...");
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Stopped listening.");
      lastCommandRef.current = ""; // reset on stop

    }
  };

  return (
    <button onClick={toggleListening}  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    borderRadius: "25px",
    background: isListening ? "red" : "#1d72b8",
    color: "white",
    border: "none",
    zIndex: 9999,
    boxShadow: "0 0 8px rgba(0,0,0,0.3)"
  }}>
      {isListening ? "Stop Listening" : "🎙️ Ask Voice Assistant"}
    </button>
  );
};

export default VoiceControl;