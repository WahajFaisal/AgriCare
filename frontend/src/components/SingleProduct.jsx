import { useNavigate } from "react-router-dom";
import { backendUrl } from "../data/data";
import { useEffect, useState } from "react";

const SingleProduct = (props) => {
  const navigate = useNavigate();
  const {
    name,
    quantity,
    description,
    price,
    latestBid,
    location,
    sellerId,
    moisture,
    id,
    quality,
    category,
    approved,
    rate,
    type,
  } = props.product;
  // console.log(latestBid);
  // console.log(id);
  let cat = props.cat;
  cat = cat.toLowerCase();
  // console.log(localStorage.getItem("role"));
  const [user, setUser] = useState("");
  const role = localStorage.getItem("role");
  const takeDecision = () => {
    if (role == "buyer") {
      return (
        <button onClick={moveToBid} className="bg-[#00df9a]">
          Go for Bid
        </button>
      );
    } else {
      return (
        <button onClick={deleteProduct} className="bg-[#00df9a]">
          Delete
        </button>
      );
    }
  };
  async function deleteProduct() {
    const data = await fetch(`${backendUrl}admin/crop/deleteCrop/${id}`, {
      method: "GET",
    });
    if (data.status === 201) {
      navigate("product");
    }
  }
  const getUser = async () => {
    const resp = await fetch(
      `${backendUrl}admin/user/user/${localStorage.getItem("id")}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    setUser(data.data);
  };

  async function approveProduct() {
    const data = await fetch(`${backendUrl}admin/crop/approve/${id}`, {
      method: "GET",
    });
    if (data.status === 201) {
      navigate("/loading/product");
    }
  }

  const showDetails = () => {};

  const moveToBid = () => {
    if (approved == false) {
      alert("Not Approved Crop");
      return;
    }
    navigate(`/booking/${id}`);
  };
  const moveToBidBuyers = () => {
    navigate(`/allBids/${id}`);
  };
  const moveToEdit = () => {
    navigate(`/editProduct/${id}`);
  };
  const sendMessage = () => {
    navigate(`/message/${id}`);
  };
  const showEdit = () => {
    return (
      <button onClick={moveToEdit} className="bg-[#00df9a]">
        Edit
      </button>
    );
  };
  const showBid = () => {
    return (
      <button onClick={moveToBid} className="bg-[#00df9a]">
        Go for Bid
      </button>
    );
  };
  const showBids = () => {
    return (
      <button onClick={moveToBidBuyers} className="bg-[#00df9a]">
        All Bids
      </button>
    );
  };
  const showApprove = () => {
    return (
      <button onClick={approveProduct} className="bg-[#00df9a]">
        Approve
      </button>
    );
  };
  const messages = () => {
    navigate(`/messages/${id}`);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <div className="w-full">
        {(cat == category ||
          (cat == "all" && localStorage.getItem("role") !== "farmer") ||
          (localStorage.getItem("id") == sellerId &&
            (cat == category || cat == "all"))) && (
          <div className="relative m-10 flex w-[400px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:bg-gradient-to-r from-green-500 from-10% via-black-500 via-30% to-emerald-500 to-90%">
            <a
              className="relative mx-3 mt-3 flex h-24 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                className="w-full object-cover"
                src="agricare.jpeg"
                alt="product image"
              />
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#" className="flex justify-between">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {name}
                </h5>
                <h5 className="text-xl tracking-tight text-slate-900">
                  {type.toUpperCase()}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    {price}
                  </span>
                  RS/KG
                </p>
                <div className="flex items-center">
                  Rating
                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                    {rate}
                  </span>
                </div>
              </div>
              {localStorage.getItem("role") != "admin" && (
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      {category.toUpperCase()}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <span className="mr-2 ml-3 rounded bg-black-200 px-2.5 py-0.5 text-xs font-semibold">
                      Moisture Level: {moisture}
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  Latest Bid
                  <span className="text-3xl font-bold text-slate-900">
                    {latestBid}
                  </span>
                </p>
                <div className="flex items-center">
                  <span className="mr-2 ml-3 rounded bg-black-200 px-2.5 py-0.5 text-xs font-semibold">
                    Quality: {quality}
                  </span>
                </div>
              </div>
              {localStorage.getItem("role") === "admin" &&
                approved === false && (
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 my-4"
                    onClick={approveProduct}
                  >
                    Approve
                  </a>
                )}

              {localStorage.getItem("role") === "buyer" && (
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 my-4"
                  onClick={moveToBid}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Bid
                </a>
              )}
              {(localStorage.getItem("role") == "farmer" ||
                localStorage.getItem("role") == "admin") && (
                <div>
                  <a
                    href="#"
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 my-4"
                    onClick={moveToEdit}
                  >
                    Edit
                  </a>
                  {localStorage.getItem("role") == "farmer" && (
                    <a
                      href="#"
                      className="flex items-ceter justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 my-4"
                      onClick={moveToBidBuyers}
                    >
                      All Bids
                    </a>
                  )}
                  {localStorage.getItem("role") == "buyer" && (
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 my-4"
                      onClick={moveToBidBuyers}
                    >
                      Bids
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
