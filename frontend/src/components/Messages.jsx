import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../data/data";
import Navbar from "./Navbar";

const Messages = () => {
  const params = useParams();
  let productId = params.id;
  const navigate = useNavigate();
  const [messages, setMessages] = useState();
  const getData = async () => {
    const resp = await fetch(
      `${backendUrl}buyer/conversation/view/${productId}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    setMessages(data.data);
  };
  const reply = (buyerId) => {
    navigate(`message/${buyerId}`);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <h1 className="text-white text-center my-5">All Queries</h1>
      <div className="flex flex-row justify-between">
        {messages &&
          messages.map((message) => (
            <div
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              key={message.id}
            >
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tightext-white">
                    {message.buyerId}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-400">
                  {message.message}
                </p>
              </div>
              <button onClick={reply(message.buyerId)}>Reply</button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Messages;
