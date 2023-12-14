import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { chatBackendUrl } from "../data/data";
import axios from "axios";
const MessageAdd = () => {
  const params = useParams();
  let expertId = params.id;
  // console.log(expertId);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await axios.post(`${chatBackendUrl}api/v1/chatAgri`, {
      userId: expertId,
      mongoId: localStorage.getItem("mongoId"),
    });
    let chatId = data.data._id;
    // console.log(chatId);
    const messageData = await axios.post(
      `${chatBackendUrl}api/v1/messageAgri`,
      {
        message: `Message sent by query way - ${message}`,
        chatId: chatId,
        mongoId: localStorage.getItem("mongoId"),
      }
    );
    if (data && messageData) {
      alert("Sent");
      navigate("/product");
    }
    // // console.log(data);
    // if (data.status === 201) {
    //   navigate("/product");
    // } else {
    //   alert("Error");
    // }
  };

  const handleCrossIconClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleCrossIconClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.348 15.364a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 11-1.414-1.414L8.586 10l-2.93-2.93a1 1 0 111.414-1.414L10 8.586l2.93-2.93a1 1 0 111.414 1.414L11.414 10l2.93 2.93a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-center text-green-500 mb-8">
            Drop a Message
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-green-500 font-bold mb-2"
              >
                Message
              </label>
              <input
                type="text"
                id="message"
                className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                value={message}
                onChange={handleMessageChange}
                required
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-[#00df9a] w-[200px] rounded-md font-bold mx-11 my-6 py-2.5 text-black "
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageAdd;
