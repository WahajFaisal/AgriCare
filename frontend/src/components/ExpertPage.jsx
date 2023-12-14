import React from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { chatBackendUrl } from "../data/data";

const ExpertPage = () => {
  const expertId = useParams("id");
  const navigate = useNavigate();
  const userId = expertId.id;
  const openChat = async () => {
    // alert("GGG");
    const data = await axios.post(`${chatBackendUrl}api/v1/chatAgri`, {
      userId,
      mongoId: localStorage.getItem("mongoId"),
    });
    if (data) {
      window.location.href = "http://localhost:3000";
    }
  };
  const handleQuery = () => {
    navigate(`/message/${userId}`);
  };
  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/2">
              <div
                className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                onClick={openChat}
              >
                <h2 className="tracking-widest text-xs title-font font-medium text-black-400 mb-1">
                  OPTION
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Direct Message
                </h1>
                <p className="leading-relaxed mb-3">Real Time Chat</p>
              </div>
            </div>
            <div className="p-4 lg:w-1/2" onClick={handleQuery}>
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-black-400 mb-1">
                  OPTION
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Send a Query
                </h1>
                <p className="leading-relaxed mb-3">Simple send a query</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertPage;
