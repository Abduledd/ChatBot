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
    console.log("Sending message:", userInput); // Log the user's message before sending

    const newChat = [...chatHistory, { text: userInput, sender: "user" }];
    setChatHistory(newChat);
    console.log(newChat);
    console.log("Before response");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sendMessage",
        {
          message: userInput,
        }
      );

      const botReply = response.data.message;
      const newChatWithBot = [...newChat, { text: botReply, sender: "bot" }];
      setChatHistory(newChatWithBot);
      console.log("Bot's reply:", botReply); // Log the bot's reply after receiving
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className="bg-black ">
      <div className="">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="w-20 bg-black">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
