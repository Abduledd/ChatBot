import React, { useState } from "react";
import axios from "axios";
import chatBotImg from "../assets/download.jpg";
import userImg from "../assets/user.png";
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
      setUserInput("");
      console.log("Bot's reply:", botReply); // Log the bot's reply after receiving
      console.log(newChat);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  return (
    <div className="flex-1 p-10 sm:p-6 justify-between flex flex-col max-h-screen overflow-hidden bg-slate-200 mb-5 rounded-lg ">
      <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div class="relative flex items-center space-x-4">
          <div class="relative">
            <span class="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src={chatBotImg}
              alt=""
              class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div class="flex flex-col leading-tight">
            <div class="text-2xl mt-1 flex items-center">
              <span class="text-gray-700 mr-3">AI Chatbot</span>
            </div>
            <span class="text-lg text-gray-600">online</span>
          </div>
        </div>
      </div>
      <div
        name="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user"
                ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
            }`}>
            {message.sender === "user" ? (
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
                    src={userImg}
                    alt="user"
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
                    alt="bot"
                    class="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Type your message!"
            value={userInput}
            onChange={handleUserInput}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
          />
          <button
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            onClick={() => {
              handleSendMessage();
              setUserInput("");
            }}>
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6 ml-2 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
