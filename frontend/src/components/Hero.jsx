import React from "react";
import "../App.css";
import { FaCarrot } from "react-icons/fa";
import { CiWheat } from "react-icons/ci";
import { CiApple } from "react-icons/ci";

const Hero = () => {
  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">Growing With Agricare</p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Grow With Us
        </h1>
        <div className="flex space-between relative left-72">
          <FaCarrot size={65} />
          <CiWheat size={65} />
          <CiApple size={65} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
