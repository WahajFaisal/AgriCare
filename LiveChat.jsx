// LiveChat.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../data/data";
import Cookies from "js-cookie";

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { name: "User1", message: "I am Fassih", time: "10:30 AM" },
    { name: "User2", message: "I am Wahaj", time: "10:35 AM" },
  ]);

  const [message, setMessage] = useState("");

  const fetchAllMessages = async () => {
    const resp = await axios.get(`${backendUrl}buyer/conversation/view`);
    setMessages(resp.data.data);
  };

  const addMessage = async () => {
    if (message.trim().length === 0) {
      return;
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timestamp = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

    const response = await axios.post(`${backendUrl}buyer/conversation/add`, {
      name: Cookies.get("username"),
      message,
      time: timestamp,
    });

    let array = [
      ...messages,
      { name: Cookies.get("username"), message, time: timestamp },
    ];

    setMessages(array);
    setMessage("");
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-96 h-96 flex flex-col border shadow-md bg-white">
        <div className="flex-1 px-4 py-4 overflow-y-auto">
          <div className="flex flex-col items-end mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold">{msg.name}</div>
                  <div className="text-xs text-gray-500">{msg.time}</div>
                </div>
                <div
                  className={`${
                    msg.name === Cookies.get("username")
                      ? "self-end bg-green-400 text-white"
                      : "self-start bg-blue-400 text-white"
                  } p-4 rounded-lg relative`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center border-t p-4 chatAction">
          <div className="w-full mx-4">
            <input
              className="w-full rounded-full border border-gray-200 px-4 py-2 focus:outline-none focus:ring focus:border-indigo-500"
              type="text"
              defaultValue=""
              placeholder="Type a message..."
              autoFocus=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button
              className="inline-flex hover:bg-indigo-50 rounded-full p-4"
              type="button"
              onClick={addMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
