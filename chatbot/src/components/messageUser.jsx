import React from "react";
import chaBot from "../assets/download.png";
const messageUser = () => {
  return (
    <div>
      <div class="flex items-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"></span>
          </div>
        </div>
        <img
          src={chaBot}
          alt="userPhoto"
          class="w-6 h-6 rounded-full order-1"
        />
      </div>
    </div>
  );
};

export default messageUser;
