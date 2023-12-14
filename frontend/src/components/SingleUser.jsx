import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../data/data";
import { useEffect, useState } from "react";

const SingleUser = ({ user }) => {
  const navigate = useNavigate();
  const { name, email, role, id, verify } = user;
  const [veriState, setVeriState] = useState("");
  useEffect(() => {
    verify || role == "user"
      ? setVeriState("Verified")
      : setVeriState("Not Verified");
  }, []);
  const deleteUser = async () => {
    const data = await fetch(`${backendUrl}admin/user/deleteUser/${id}`, {
      method: "GET",
    });
    if (data.status === 201) {
      // alert("User Deleted Successfully");
      navigate("/loading/allUsers");
    }
  };
  const verifyUser = async () => {
    const data = await fetch(`${backendUrl}admin/user/verifyUser/${id}`, {
      method: "GET",
    });
    if (data.status === 201) {
      // alert("User Deleted Successfully");
      navigate("/loading/allUsers");
    }
  };
  return (
    <div className="single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
      <Link
        to={name}
        state={user}
        className="hover:text-rose-500 duration-300 flex justify-between items-center"
      >
        <h2 className="text-stone-950 font-semibold text-xl capitalize">
          {user.name.slice(0, 20)}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">
        Email: <span className="font-semibold capitalize">{email}</span>
      </p>
      <p className="text-sm text-gray-600">
        Role: <span className="text-rose-500 font-semibold">{role}</span>
      </p>
      <p className="text-sm text-gray-600">
        Verify: <span className="text-rose-500 font-semibold">{veriState}</span>
      </p>
      <button onClick={deleteUser} className="bg-[#00df9a]">
        Delete
      </button>
      {!verify && (
        <button onClick={verifyUser} className="bg-[#00df9a]">
          Verify
        </button>
      )}
    </div>
  );
};

export default SingleUser;
