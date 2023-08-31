import React from "react";
import chatBot from "../assets/download.png";
const messageBot = () => {
  return (
    <div>
      <div class="flex items-end justify-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white "></span>
          </div>
        </div>
        <img src={chatBot} alt="Bot" class="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
  );
};

export default messageBot;
