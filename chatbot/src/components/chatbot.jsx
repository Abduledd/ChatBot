import React, { useState } from "react";
import axios from "axios";
// import messageBot from "./messageBot";
// import messageUser from "./messageUser";
import chatBotImg from "../assets/download.png";
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
      console.log(newChat);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <div className="lex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "bot"
                ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
            }`}>
            {message.sender === "bot" ? (
              <div>
                <div class="flex items-end justify-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        {message.text}
                      </span>
                    </div>
                  </div>
                  <img
                    src={chatBotImg}
                    alt="Bot"
                    class="w-6 h-6 rounded-full order-2"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div class="flex items-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        {message.text}
                      </span>
                    </div>
                  </div>
                  <img
                    src={chatBotImg}
                    alt="userPhoto"
                    class="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          className="border rounded-l p-2 flex-grow"
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
