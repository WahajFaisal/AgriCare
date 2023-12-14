import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl, chatBackendUrl } from "../data/data";
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCnicChange = (event) => {
    setCnic(event.target.value);
  };
  const moveLogin = () => {
    navigate("/login");
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Handle form submission
      // if()
      // console.log("jjh");
      const dataT = await axios.post(`${chatBackendUrl}api/v1/auth/register`, {
        username: name,
        email,
        password,
        cnic,
        role,
        experties: category,
      });
      console.log(dataT, "SSD");
      if (dataT.status != 201) {
        alert(`${dataT.data.message}`);
      }
      let user = dataT.data;
      const data = await axios.post(
        `${backendUrl}authentication/auth/register`,
        {
          name,
          email,
          password,
          location,
          description,
          experties: category,
          cnic,
          role,
          mongoId: user._id,
        }
      );
      console.log(data);
      if (data.status === 201) {
        localStorage.setItem("email", email);
        navigate("/otp");
      } else {
        alert(`${data.data.data.message}`);
      }
    } catch (err) {
      // console.log(err);
      let rsp = err.request.response;
      // alert(JSON.parse(rsp).msg);
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const navigate = useNavigate();

  const handleCrossIconClick = () => {
    navigate("/");
  };

  return (
    <>
      <button
        className="absolute top-2 right-2 text-white-500 hover:text-white-700 focus:outline-none"
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
      <>
        {/* component */}
        <div className="h-screen md:flex">
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-green-800 to-green-700 i justify-around items-center hidden">
            <div>
              <h1 className="text-white font-bold text-4xl font-sans">
                Agricare
              </h1>
              <p className="text-white mt-1">Agriculture in new style</p>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form className="bg-white" onSubmit={handleFormSubmit}>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Create Account
              </p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="email"
                  name=""
                  id=""
                  placeholder="Email Address"
                  onChange={handleEmailChange}
                  value={email}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="CNIC"
                  value={cnic}
                  onChange={handleCnicChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Location"
                  value={location}
                  onChange={handleLocationChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select user role</option>
                  <option value="buyer">Buyer</option>
                  <option value="farmer">Farmer</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              {role == "expert" && (
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Experties</option>
                    <option value="grains">Grains</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="block w-full bg-green-600 mt-4 py2 rounded-2xl text-white font-semibold mb-2"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default SignupPage;