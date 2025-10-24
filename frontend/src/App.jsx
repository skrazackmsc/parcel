import { useState, useEffect, useRef } from "react";
import axios from "axios";
//import "./App.css";
import "./chatbot.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  setInput("");

  // Add user message once
  setMessages((prev) => [...prev, userMsg]);

  try {
    // Send to backend
    const res = await axios.post("/api/chat", { message: userMsg.text });
    const botMsg = { sender: "bot", text: res.data.reply };

    // Add bot message
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};
  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h2>ChatBot Support</h2>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            <div className="bubble-text">{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default App;