import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai"; // Importing the arrow icon
import { FaShoppingBag, FaCheckCircle, FaBan } from "react-icons/fa"; // Additional icons
import "./myorders.css";
import { backendUrl } from "../data/data";
import AdminDashboard from "./AdminDashboard";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const resp = await fetch(`${backendUrl}admin/order/allOrders`, {
      method: "GET",
    });
    const data = await resp.json();
    console.log(data.data);
    setOrders(data.data);
  };

  const getUserOrder = async () => {
    const resp = await fetch(
      `${backendUrl}buyer/order/myOrders/${localStorage.getItem("id")}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    setOrders(data.data);
  };

  const trackorder = (id) => {
    navigate(`/track-order/${id}`);
  };

  const changeStatus = (id) => {
    navigate(`/status/${id}`);
  };

  useEffect(() => {
    localStorage.getItem("role") == "admin" ? getData() : getUserOrder();
    // console.log(orders);
  }, []);

  const handleShowDetails = (orderIndex) => {
    setSelectedOrder(orders[orderIndex]);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const rateUser = (id) => {
    navigate(`/rate/${id}`);
  };

  return (
    <div>
      {localStorage.getItem("role") == "admin" ? (
        <div className="flex">
          <AdminDashboard />
          <div className="orders-page">
            <h1 className="centered">My Orders</h1>
            {orders.map((order, index) => (
              <div key={index} className="order">
                <button
                  className="my-orders-btn"
                  onClick={() => handleShowDetails(index)}
                >
                  <FaShoppingBag className="icon" /> Order {order.id}
                </button>
              </div>
            ))}

            {selectedOrder && (
              <div className="overlay">
                <div className="receipt-modal">
                  <span className="close" onClick={handleCloseModal}>
                    &times;
                  </span>
                  <div className="product-details">
                    <h2>
                      <FaShoppingBag /> {selectedOrder.productId}
                    </h2>
                    <p>
                      {" "}
                      <strong>Price:</strong> {selectedOrder.price}
                    </p>
                    <p>
                      {" "}
                      <strong>Status:</strong> {selectedOrder.status}
                    </p>
                    <p className="centered">
                      <FaBan /> <strong>Payment Status:</strong>{" "}
                      <span className="paid">
                        <FaCheckCircle /> Paid
                      </span>
                    </p>
                  </div>
                  {localStorage.getItem("role") == "admin" ? (
                    <button
                      className="track-order-btn"
                      onClick={() => changeStatus(selectedOrder.id)}
                    >
                      Change Status <AiOutlineArrowRight />
                    </button>
                  ) : (
                    <>
                      <button
                        className="track-order-btn"
                        onClick={() => trackorder(selectedOrder.id)}
                      >
                        Track Order <AiOutlineArrowRight />
                      </button>
                      <button
                        className="track-order-btn block"
                        onClick={() => rateUser(selectedOrder.productId)}
                      >
                        Rate a User
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <>
            <div className="orders-page">
              <h1 className="centered">My Orders</h1>
              {orders.map((order, index) => (
                <div key={index} className="order">
                  <button
                    className="my-orders-btn"
                    onClick={() => handleShowDetails(index)}
                  >
                    <FaShoppingBag className="icon" /> Order {order.id}
                  </button>
                </div>
              ))}

              {selectedOrder && (
                <div className="overlay">
                  <div className="receipt-modal">
                    <span className="close" onClick={handleCloseModal}>
                      &times;
                    </span>
                    <div className="product-details">
                      <h2>
                        <FaShoppingBag /> {selectedOrder.productId}
                      </h2>
                      <p>
                        {" "}
                        <strong>Price:</strong> {selectedOrder.price}
                      </p>
                      <p>
                        {" "}
                        <strong>Status:</strong> {selectedOrder.status}
                      </p>
                      <p className="centered">
                        <FaBan /> <strong>Payment Status:</strong>{" "}
                        <span className="paid">
                          <FaCheckCircle /> Paid
                        </span>
                      </p>
                    </div>
                    {localStorage.getItem("role") == "admin" ? (
                      <button
                        className="track-order-btn"
                        onClick={() => changeStatus(selectedOrder.id)}
                      >
                        Change Status <AiOutlineArrowRight />
                      </button>
                    ) : (
                      <>
                        <button
                          className="track-order-btn"
                          onClick={() => trackorder(selectedOrder.id)}
                        >
                          Track Order <AiOutlineArrowRight />
                        </button>
                        <button
                          className="track-order-btn block"
                          onClick={() => rateUser(selectedOrder.productId)}
                        >
                          Rate a User
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
