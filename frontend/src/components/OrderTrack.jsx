import React, { useEffect, useState } from "react";
import { BsFillClipboardCheckFill, BsFillBox2Fill } from "react-icons/bs";
import { GrDeliver } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import "./ordertrack.css";
import { backendUrl } from "../data/data";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const OrderTracking = () => {
  const [order, setOrder] = useState(null);
  const param = useParams();
  const id = parseInt(param.id);
  const getData = async () => {
    const resp = await fetch(`${backendUrl}buyer/order/view/${id}`, {
      method: "GET",
    });
    // console.log(resp);
    const data = await resp.json();
    setOrder(data.data);
  };

  useEffect(() => {
    getData();
    // console.log(order);
  }, []);

  return (
    <>
      <Navbar />
      <div className="order-tracking-container">
        <h1>Order Tracking</h1>
        {order === null ? (
          <h1 className="text-white text-center">Data Loading</h1>
        ) : (
          <>
            <div className="product-details">
              <h4>Order: {order.id}</h4>
              <h4>Product: {order.productId}</h4>
              <h4>Price: {order.price}</h4>
            </div>
            <div className="progress-bar">
              <div
                className={
                  order.status == "Order Placed" ? "step active" : "step"
                }
              >
                <BsFillClipboardCheckFill /> Order Placed
              </div>
              <div
                className={
                  order.status == "Processing" ? "step active" : "step"
                }
              >
                <BsFillBox2Fill /> Processing
              </div>
              <div
                className={order.status == "Shipped" ? "step active" : "step"}
              >
                <GrDeliver /> Shipped
              </div>
              <div
                className={order.status == "Delivered" ? "step active" : "step"}
              >
                <IoHome /> Delivered
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderTracking;
