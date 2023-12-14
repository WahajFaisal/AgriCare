import React from "react";
import Cookies from "js-cookie";
import { Routes, Route } from "react-router-dom";
import { Register, Chat, Error } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserToLocalStorage } from "./utils/localStorage";
import Blog from "./pages/Blog";
const App = () => {
  let user = {
    username: Cookies.get("username"),
    email: Cookies.get("email"),
    _id: Cookies.get("_id"),
    avatar: Cookies.get("avatar"),
    token: Cookies.get("token"),
  };
  //console.log(user);
  // console.log(kkl)
  addUserToLocalStorage(user);
  console.log(localStorage.getItem('user'));
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Chat />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
