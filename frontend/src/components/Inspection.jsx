import React, { useEffect, useState } from "react";
import Herotext from "../components/Herotext";
import Navbar from "./Navbar";
import axios from "axios";
import { backendUrl } from "../data/data";
import { useNavigate } from "react-router-dom";
const Inspection = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState(null);
  const [show, setShow] = useState("hidden");
  const [selectedCategory, setSelectedCategory] = useState("Select Crop");
  const [selectedCrop, setSelectedCrop] = useState(-1);
  const myCrops = async () => {
    const resp = await axios.get(
      `${backendUrl}seller/crop/seller/${localStorage.getItem("id")}`
    );
    setCrops(resp.data.data);
  };
  const handleCropSelect = (category, id) => {
    setSelectedCategory(category);
    setSelectedCrop(id);
    setShow("hidden");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCrop == -1) {
      alert("Select Crop");
      return;
    }
    try {
      const resp = await axios.post(`${backendUrl}seller/inspection/add`, {
        crop: selectedCategory,
        cropId: selectedCrop,
        sellerId: localStorage.getItem("id"),
      });
      alert(resp.data.message);
      navigate("/loading/product");
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    myCrops();
  }, []);
  return (
    <div>
      <Navbar />
      <Herotext textt="Crop Inspection" />
      <div className="h-[10rem] flex items-center justify-center shadow-md">
        <form className="flex gap-10 items-center" onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              type="button"
              onClick={() =>
                show == "hidden" ? setShow("") : setShow("hidden")
              }
            >
              {selectedCategory}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id="dropdownHover"
              className={`z-10 ${show}  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                {crops != null ? (
                  crops.map((crop) => (
                    <li key={crop.id}>
                      <span
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white"
                        onClick={() => handleCropSelect(crop.category, crop.id)}
                      >
                        {crop.category} RS.{crop.price} {crop.quantity}KG
                      </span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white">
                      No Crops
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="text-gray-50 border rounded-full border-green-500 px-10 bg-green-500 py-2"
          >
            Request Inspection
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inspection;
