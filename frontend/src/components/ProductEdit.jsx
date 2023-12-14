import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../data/data";
import Swal from "sweetalert2";
import {
  FaProductHunt,
  FaWeight,
  FaTint,
  FaMapMarker,
  FaAlignLeft,
  FaSeedling,
} from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md"; // Use MdAttachMoney for PKR
import "./AddProduct.css";

const ProductEdit = () => {
  const productId = useParams().productId;
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [moisture, setMoisture] = useState();
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");

  const [price, setPrice] = useState(0);

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handlePriceChange = (event) => {
  //   setPrice(event.target.value);
  // };

  // const handleQuantityChange = (event) => {
  //   setQuantity(event.target.value);
  // };

  // const handleLocationChange = (event) => {
  //   setLocation(event.target.value);
  // };

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value);
  // };

  // const handleMoistureChange = (event) => {
  //   setMoisture(event.target.value);
  // };

  const getData = async () => {
    const data = await fetch(
      `${backendUrl}seller/crop/view/${productId}/${localStorage.getItem(
        "id"
      )}`,
      {
        method: "GET",
      }
    );
    const product = await data.json();
    if (product.data == null && localStorage.getItem("role") != "admin") {
      Swal.fire({
        icon: "error",
        title: "Not Allowed",
      });
      navigate("/product");
    }
    setName(product.data.name);
    setPrice(product.data.price);
    setQuantity(product.data.quantity);
    setDescription(product.data.description);
    setLocation(product.data.location);
    setCategory(product.data.category);
    setMoisture(product.data.moisture);
    setType(product.data.type);
  };

  const getAdminData = async () => {
    const data = await fetch(`${backendUrl}seller/crop/view/${productId}`, {
      method: "GET",
    });
    const product = await data.json();
    if (product.data == null && localStorage.getItem("role") != "admin") {
      Swal.fire({
        icon: "error",
        title: "Not Allowed to Edit",
      });
      navigate("/product");
    }
    setName(product.data.name);
    setPrice(product.data.price);
    setQuantity(product.data.quantity);
    setDescription(product.data.description);
    setLocation(product.data.location);
    setCategory(product.data.category);
    setMoisture(product.data.moisture);
    setType(product.data.type);
  };

  useEffect(() => {
    if (localStorage.getItem("role") == "admin") {
      getAdminData();
    } else {
      getData();
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      name &&
      price &&
      quantity &&
      moisture &&
      location &&
      description &&
      category &&
      type
    ) {
      // Perform the logic to add the product here
      // Display success alert using SweetAlert
    } else {
      // Display an error alert if any field is empty
      Swal.fire({
        icon: "error",
        title: "All fields are required!",
      });
    }
    const data = await fetch(`${backendUrl}seller/crop/update/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
        // Add other headers here if needed
      },
      body: JSON.stringify({
        name,
        category,
        price,
        quantity,
        description,
        location,
        moisture,
        type,
        tokenData: localStorage.getItem("token"),
        userId: localStorage.getItem("id"),
      }),
    });
    // console.log(data);
    if (data.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Product Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    } else {
      alert("Error");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const handleCrossIconClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg">
        <div className="p-6">
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
          <div className="add-product-container">
            <div className="left-container">
              {/* Artistic image or any content for the left container */}
              <img src="agricare.jpeg" alt="" />
            </div>
            <div className="right-container">
              <h2>Add Product</h2>
              <form>
                <div className="form-group">
                  <label>
                    <FaProductHunt /> Product Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <MdAttachMoney /> Price (PKR):
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaWeight /> Quantity in KG:
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaTint /> Moisture Percentage:
                  </label>
                  <input
                    type="text"
                    value={moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaMapMarker /> Location:
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaAlignLeft /> Description:
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaSeedling /> Crop Type:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="grains">Grains</option>
                    <option value="vegetables">Vegetable</option>
                    <option value="fruits">Fruit</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FaSeedling /> Crop Condition:
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="dusty">Dusty</option>
                    <option value="wet">Wet</option>
                    <option value="rotten">Rotten</option>
                    <option value="fresh">Fresh</option>
                  </select>
                </div>
                <button type="button" onClick={handleFormSubmit}>
                  Upload Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
