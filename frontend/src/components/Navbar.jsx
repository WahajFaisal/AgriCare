import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../data/data";
import { toast } from "react-toastify";

// import { useHistory } from "react-router-dom";
const Navbar = () => {
  // const history = useHistory();
  const location = useLocation();
  console.log(location.pathname);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const logout = () => {
    localStorage.setItem("role", "no");
    navigate("/");
  };

  const toastIfy = () => {
    if (
      location.pathname == "/" ||
      location.pathname == "/about" ||
      location.pathname == "/cont"
    ) {
      return;
    }
    if (
      localStorage.getItem("role") == "no" ||
      localStorage.getItem("role") == undefined
    ) {
      toast.error("Login First", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    // fetchData();
    toastIfy();
  }, []);

  const handleServicesMenu = () => {
    setShowServicesMenu(!showServicesMenu);
  };

  const handleNotificationMenu = () => {
    setShowNotification(!showNotification);
  };
  const adminLog = () => {
    navigate("/adminLogin");
  }
  return (
    <div className="flex justify-between items-center h-24 w-screen mb-2 mx-auto px-4 text-white border-2 border-green-400 border-s-green">
       <h1 className="w-screen text-3xl font-bold text-[white]">AGRICARE.</h1> 
      
      <ul className="hidden md:flex ">
      <button
            className="w-[200px] rounded-md font-medium my- mx-auto py-3 text-green-500 focus:text-white"
            onClick={adminLog}
          >
            Admin
          </button>
        <li>
          <a className="p-5 hover:underline" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="p-5 hover:underline" href="/product">
            Products
          </a>
        </li>

        {
          <li className="z-20">
            <a
              className="p-4 cursor-pointer relative hover:underline"
              onMouseEnter={handleServicesMenu}
              onMouseLeave={handleServicesMenu}
              href=""
            >
              Services
              {showServicesMenu && (
                // <ul className='absolute left-0 mt-2 bg-white text-black rounded-lg py-2 px-4'>
                //   <li className='py-1 hover:bg-green-300' href='/cropsinspection'>Crops Inspection</li>
                //   <li className='py-1 hover:bg-green-300' href='/cropsinspection'>Track Order</li>
                //   <li className='py-1 hover:bg-green-300' href='/cropsinspection'>Expert Advice</li>
                //   <li className='py-1 hover:bg-green-300' href='/cropsinspection'>Farmer Community</li>
                // </ul>

                <ul className="z-4 absolute left-0 mt-2 bg-white text-black rounded-lg py-2 px-4">
                  {/* <li className="py-1 hover:bg-green-300">
                    <a href="/cropsinspection">Crops Inspection</a>
                  </li> */}
                  <li className="py-1 hover:bg-green-300 ">
                    <a href="/services">Warehouses</a>
                  </li>
                  <li className="py-1 hover:bg-green-300">
                    <a href="/farmercommunity">Farmer Community</a>
                  </li>
                  {localStorage.getItem("role") == "farmer" && (
                    <li className="py-1 hover:bg-green-300">
                      <a href="/inspection">Crop Inspection</a>
                    </li>
                  )}
                </ul>
              )}
            </a>
          </li>
        }

        <li>
          <a className="p-4 hover:underline" href="/cont">
            Contact
          </a>
        </li>
        {/* <li>
          <a className="p-4" href="/booking">
            Bidding
          </a>
        </li> */}
        <li>
          <a className="p-4 hover:underline" href="/about">
            About
          </a>
        </li>
        {localStorage.getItem("role") == "buyer" && (
          <li>
            <a href="/orders" className="p-4 hover:underline">
              Orders
            </a>
          </li>
        )}

        {/* {localStorage.getItem("role") == "buyer" && (
          <li>
            <a
              className="p-4 cursor-pointer relative"
              href="#"
              onMouseEnter={handleNotificationMenu}
              onMouseLeave={handleNotificationMenu}
            >
              Notifications
              {showNotification && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded-lg py-2 px-4">
                  {notifications &&
                    notifications.map((item) => (
                      <li className="py-1 hover:bg-green-300" key={item.id}>
                        {item.message}
                      </li>
                    ))}
                </ul>
              )}
            </a>
          </li>
        )} */}

        {localStorage.getItem("role") === "no" ? (
          <a href="login">
            <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my- mx-auto py-3 text-black ">
              Login
            </button>
          </a>
        ) : (
          <button
            className="bg-[#00df9a] w-[200px] rounded-md font-medium my- mx-auto py-3 text-black"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">AGRICAR.</h1>
        <ul className="uppercase p-4">
          <a className="p-4 border-b border-gray-600" href="/">
            Home
          </a>
          <li className="p-4 border-b border-gray-600">Products</li>
          <li className="p-4 border-b border-gray-600">Add</li>
          <li className="p-4 border-b border-gray-600">About</li>

          {
            <li
              className="p-4 cursor-pointer relative"
              onMouseEnter={handleServicesMenu}
              onMouseLeave={handleServicesMenu}
            >
              Services
              {showServicesMenu && (
                // <ul className='absolute left-0 mt-2 bg-white text-black py-2 px-4'>
                //   <li className='py-1 hover:bg-green-300'>Crops Inspection</li>
                //   <li className='py-1 hover:bg-green-300'>Track Order</li>
                //   <li className='py-1 hover:bg-green-300'>Expert Advice</li>
                //   <li className='py-1 hover:bg-green-300'>Farmer Community</li>
                // </ul>

                <ul className="absolute left-0 mt-2 bg-white text-black rounded-lg py-2 px-4">
                  <li className="py-1 hover:bg-green-300">
                    <a href="/cropsinspection">Crops Inspection</a>
                  </li>
                  <li className="py-1 hover:bg-green-300">
                    <a href="/trackorder">Track Order</a>
                  </li>
                  <li className="py-1 hover:bg-green-300">
                    <a href="/expertadvice">Expert Advice</a>
                  </li>
                  <li className="py-1 hover:bg-green-300">
                    <a href="/farmercommunity">Farmer Community</a>
                  </li>
                </ul>
              )}
            </li>
          }

          <a className="p-4 border-b border-gray-600" href="/cont">
            Contact
          </a>

          <a href="login">
            <button className="absolute left-0 mt-2 font-bold text-white rounded-lg p-4 py-9 border-gray-600">
              Login
            </button>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
