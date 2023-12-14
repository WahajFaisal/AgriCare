import React, { useState } from "react";
// import "./loginPage.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl } from "../data/data";
import { chatBackendUrl } from "../data/data";
import axios from "axios";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(true); // Set it to true to display the form by default
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginData = await axios.post(`${chatBackendUrl}api/v1/auth/login`, {
        email,
        password,
      });
      // Handle form submission based on the selected role
      const data = await axios.post(`${backendUrl}authentication/auth/login`, {
        email,
        password,
        role,
      });
      if (data.status !== 201) {
        alert(`${data.data.message}`);
        return;
      }
      // console.log(data);
      Cookies.set("username", loginData.data.username);
      Cookies.set("_id", loginData.data._id, { expires: 25 });
      Cookies.set("token", loginData.data.token, { expires: 25 });
      Cookies.set("avatar", loginData.data.avatar, { expires: 25 });
      Cookies.set("email", loginData.data.email, { expires: 25 });
      Cookies.set("role", data.data.data.role, { expires: 25 });
      localStorage.setItem("verify", data.data.data.verify);
      localStorage.setItem("user", loginData.data);
      // const dataJ = await data.json();
      localStorage.setItem("token", data.data.data.token);
      localStorage.setItem("id", data.data.data.id);
      localStorage.setItem("role", data.data.data.role);
      localStorage.setItem("mongoId", data.data.data.mongoId);
      // console.log(localStorage.getItem("id"));
      if (role === "farmer") {
        if (data.status == 201) {
          navigate("/product");
        } else {
          alert(`${data.data.message}`);
        }
      } else if (role === "buyer") {
        if (data.status == 201) {
          navigate("/product");
        } else {
          alert("Invalid Cred");
        }
      } else if (role === "expert") {
        if (data.status == 201) {
          window.location.href = "http://localhost:3000";
        } else {
          alert("Invalid Cred");
        }
      }
    } catch (err) {
      let rsp = err.request.response;
      alert(JSON.parse(rsp).msg);
    }
  };

  const handleCrossIconClick = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div>
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
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login Form Agricare</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <label>
                    User Role:
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select user role</option>
                      <option value="buyer">Buyer</option>
                      <option value="farmer">Farmer</option>
                      <option value="expert">Expert</option>
                    </select>
                  </label>
                  <div className="relative">
                    <button
                      className="bg-green-500 text-white rounded-md px-2 py-1"
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </button>
                  </div>
                  <a href="/signuppage">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Old Code */}
      {/* <div className="flex items-center justify-center min-h-screen bg-opacity-50">
        {showPopup && (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg relative">
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
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-green-500 mb-8">
                Login
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-green-500 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-green-500 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="borderborder-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-green-500 font-bold mb-2"
                  >
                    User Type
                  </label>
                  <select
                    id="role"
                    className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={role}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="bg-[#00df9a] w-full rounded-md font-bold py-2.5 text-black"
                  >
                    Sign In
                  </button>
                </div>
                <p className="text-center text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/signuppage"
                    className="text-green-500 hover:text-green-700"
                  >
                    Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default LoginPage;
