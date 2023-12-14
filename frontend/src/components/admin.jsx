import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs"; // Importing the arrow icon
import { RiSendPlaneFill } from "react-icons/ri"; // Importing the send plane icon
import "./admin.css";
import swal from "sweetalert";
import { backendUrl } from "../data/data";
import { useNavigate, useParams } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const AdminPanel = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = parseInt(param.id);
  const [selectedStatus, setSelectedStatus] = useState("Order Placed");

  const updateStatus = async () => {
    const resp = await fetch(`${backendUrl}admin/order/changeStatus/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: selectedStatus,
      }),
    });
    let staus = resp.status;
    return staus;
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    swal({
      title: "Update Status?",
      text: `Are you sure you want to set status to ${selectedStatus}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willUpdate) => {
      // console.log(willUpdate);
      const rep = await updateStatus();
      console.log(rep);
      if (rep == 201) {
        // Add your logic here to update the status in your backend
        console.log("Selected Status:", selectedStatus);
        swal(`Status updated! to ${selectedStatus}`, {
          icon: "success",
        });
        navigate("/orders");
      }
    });
  };

  return (
    <>
      <div className="flex">
        <AdminDashboard />
        <div className="admin-panel-container">
          <div className="status-dropdown">
            <label htmlFor="status">Select Status:</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick={handleUpdateStatus}>
              <RiSendPlaneFill />
              <span>Update</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
