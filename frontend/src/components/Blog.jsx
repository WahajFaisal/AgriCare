import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import { backendUrl } from "../data/data";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const fetchData = async () => {
    const resp = await fetch(`${backendUrl}admin/blog/allBlog`, {
      method: "GET",
    });
    const data = await resp.json();
    // console.log(data);
    setBlogs(data.data);
    // console.log(data.data);
  };
  const deleteBlog = async (id) => {
    const resp = await fetch(`${backendUrl}admin/blog/delete/${id}`, {
      method: "GET",
    });
    // console.log(resp);
    if (resp.status == 201) {
      navigate("/loading/allBlogs");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {localStorage.getItem("role") !== "admin" ? (
        <div className="margin my-5">
          <div className="container mx-auto pb-20">
            <h2 className="text-center text-3xl py-10">All Blogs</h2>
            {localStorage.getItem("role") == "admin"}
            <div className="grid grid-cols-2 gap-10">
              {blogs &&
                blogs.map((blog) => (
                  <div key={blog.id}>
                    <div className="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-lg">
                      <div className="flex justify-center items-center">
                        <a
                          className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded"
                          href="#"
                        >
                          {blog.title}
                        </a>
                      </div>
                      <div className="mt-4">
                        <a
                          className="text-lg text-gray-700 font-medium"
                          href="#"
                        >
                          {blog.blog}
                        </a>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <img
                            src="agricare.jpeg"
                            className="w-8 h-8 object-cover rounded-full"
                            alt="avatar"
                          />
                          <a className="text-gray-700 text-sm mx-3" href="#">
                            Agricare
                          </a>
                        </div>
                        <span className="font-light text-sm text-gray-600">
                          Dec, 2023
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div>
            <AdminDashboard />
          </div>
          <div className="w-3/4">
            <div className="container mx-auto pb-20">
              <h2 className="text-center text-3xl py-10">All Blogs</h2>
              <div>
                <div className="grid grid-cols-2 gap-10">
                  {blogs &&
                    blogs.map((blog) => (
                      <div key={blog.id}>
                        <div className="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-lg">
                          <div className="flex justify-center items-center">
                            <a
                              className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded"
                              href="#"
                            >
                              {blog.title}
                            </a>
                          </div>
                          <div className="mt-4">
                            <a
                              className="text-lg text-gray-700 font-medium"
                              href="#"
                            >
                              {blog.blog}
                            </a>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <img
                                src="agricare.jpeg"
                                className="w-8 h-8 object-cover rounded-full"
                                alt="avatar"
                              />
                              <a
                                className="text-gray-700 text-sm mx-3"
                                href="#"
                              >
                                Agricare
                              </a>
                            </div>
                            <span className="font-light text-sm text-gray-600">
                              Dec, 2023
                            </span>
                          </div>
                          <button
                            onClick={() => deleteBlog(blog.id)}
                            className="focus:normal-case"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
