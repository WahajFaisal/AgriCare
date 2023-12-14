import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { backendUrl } from "../data/data";
const ExpertAdvice = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(`${backendUrl}expert/instruction/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        tokenData: localStorage.getItem("token"),
      }),
    });
    console.log(data);
    if (data.status == 201) {
      navigate("/allAdvices");
    }
  };
  return (
    <>
      <Navbar />
      <h1>Add Advice</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-green-500 font-bold mb-2">
            Content
          </label>
          <input
            type="text"
            id="content"
            className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter Content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-[#00df9a] w-[200px] rounded-md font-bold mx-11 my-6 py-2.5 text-black "
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpertAdvice;
