import { useState, useEffect, useRef } from "react";
import SingleUser from "./SingleUser";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl } from "../data/data";
import AdminDashboard from "./AdminDashboard";
import getData from "../data/users";
import axios from "axios";
const Users = () => {
  const [err, setErr] = useState(null);
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  const para = useRef(null);

  const getData = async () => {
    try {
      const res = await fetch(`${backendUrl}admin/user/allUsers`, {
        method: "GET",
      });
      const json = await res.json();
      const userz = json.data;
      if (res.status !== 201) alert("Error");
      setUsers(userz);
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    const data = await fetch(`${backendUrl}admin/user/deleteUser/${id}`, {
      method: "GET",
    });
    if (data.status === 201) {
      // alert("User Deleted Successfully");
      navigate("/loading/allUsers");
    }
  };

  const verifyUser = async (id) => {
    // console.log(localStorage.getItem("id"));
    const data = await axios.get(`${backendUrl}admin/user/verifyUser/${id}`);
    // console.log(data);
    if (data.status == 201) {
      // alert("User Deleted Successfully");
      navigate("/loading/allUsers");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (err)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        <span>{err}</span>
        <Link to="/product" className="text-lg text-gray-500 font-semibold">
          &larr;Refresh page
        </Link>
      </p>
    );

  return (
    <>
      {localStorage.getItem("role") !== "admin" ? (
        <Navbar />
      ) : (
        <div className="flex">
          <div className="">
            <AdminDashboard className="mx-0" />
          </div>
          <div className="w-3/4 p-4">
            <div className="container mx-auto pb-20">
              <h2 className="text-center text-3xl py-10">All Users</h2>
              <div>
                <div className="text-gray-900 bg-gray-200 border-y-8 border-black">
                  <div className="flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4 border-6 border-r-black">
                      <tbody>
                        <tr className="border-b">
                          <th className="text-left p-3 px-5">Name</th>
                          <th className="text-left p-3 px-5">Email</th>
                          <th className="text-left p-3 px-5">Role</th>
                          <th />
                        </tr>
                        {users &&
                          users.map((user) => (
                            <tr className="border-b hover:bg-orange-100 bg-gray-100">
                              <td className="p-3 px-5">
                                <input
                                  type="text"
                                  defaultValue={user.name}
                                  className="bg-transparent border-b-2 border-gray-300 py-2"
                                  readOnly
                                />
                              </td>
                              <td className="p-3 px-5">
                                <input
                                  type="text"
                                  defaultValue={user.email}
                                  className="bg-transparent border-b-2 border-gray-300 py-2"
                                  readOnly
                                />
                              </td>
                              <td className="p-3 px-5">
                                <input
                                  type="text"
                                  defaultValue={user.role}
                                  className="bg-transparent border-b-2 border-gray-300 py-2"
                                  readOnly
                                />
                              </td>
                              <td className="p-3 px-5 flex justify-end">
                                {user.verify == false &&
                                  user.role != "buyer" && (
                                    <button
                                      type="button"
                                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                      onClick={() => verifyUser(user.id)}
                                    >
                                      Verify
                                    </button>
                                  )}
                                <button
                                  type="button"
                                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                  onClick={() => deleteUser(user.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
