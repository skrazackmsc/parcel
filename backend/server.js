// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  // Simple rule-based bot response
  let reply = "I didn’t understand that. Can you rephrase?";
  if (message.toLowerCase().includes("hello")) reply = "Hi there! 👋";
  else if (message.toLowerCase().includes("how are you"))
    reply = "I'm just a bot, but I'm doing great!";
  else if (message.toLowerCase().includes("bye")) reply = "Goodbye! 👋";

  res.json({ reply });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));