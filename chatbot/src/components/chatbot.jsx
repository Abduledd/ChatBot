import React, { useState } from "react";
import axios from "axios";

const Chatbox = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const newChat = [...chatHistory, { text: userInput, sender: "user" }];
    setChatHistory(newChat);

    try {
      const response = await axios.post("http://localhost:5000/", {
        message: userInput,
      });
      const botReply = response.data.message;
      const newChatWithBot = [...newChat, { text: botReply, sender: "bot" }];
      setChatHistory(newChatWithBot);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className="chatbox">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
