import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const naviagate = useNavigate();
  return (
    <div className="w-full bg-white text-black py-16 px-4">
      <div className="w-full max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#00df9a]">
            AGRICARE.
          </h1>
          <p className="py-4">
            AGRICARE stands as a beacon of hope and innovation in the realm of
            agriculture. With a relentless commitment to sustainable practices
            and technological advancements, we aim to revolutionize the
            agricultural landscape for a greener and more prosperous world.
          </p>
          <div className="flex justify-center md:w-[75%] my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>

        <div className="lg:col-span-3 flex justify-between">
          <div>
            <h6 className="font-medium text-black">Solutions</h6>
            <ul>
              <li className="py-2 hover:text-green-500 hover:underline">
                Analytics
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Marketing
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Commerce
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Insights
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-black">Suppport</h6>
            <ul>
              <li className="py-2 hover:text-green-500 hover:underline">
                Pricing
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Help and Feedback
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Expert Advice
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Bidding System
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-black">Company</h6>
            <ul>
              <li className="py-2 hover:text-green-500 hover:underline">
                About
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Jobs
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Press
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Careers
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-black">Legal</h6>
            <ul>
              <li className="py-2 hover:text-green-500 hover:underline">
                Claim
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Policy
              </li>
              <li className="py-2 hover:text-green-500 hover:underline">
                Terms
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
