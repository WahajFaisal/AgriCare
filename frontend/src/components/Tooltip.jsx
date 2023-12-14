// Tooltip.js
import React from "react";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import "./Tooltip.css";
import { useNavigate } from "react-router-dom";
import { chatBackendUrl } from "../data/data";
import axios from "axios";
import avataricon from "../assets/avatar.png";
const Tooltip = ({ experts, children }) => {
  const navigate = useNavigate();
  const openChat = async (userId) => {
    const data = await axios.post(`${chatBackendUrl}api/v1/chatAgri`, {
      userId,
      mongoId: localStorage.getItem("mongoId"),
    });
    console.log(data.data);
    if (data) {
      window.location.href = "http://localhost:3000";
    }
  };

  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-content ">
        <ul>
          {experts.map((expert) => (
            <li key={expert.id}>
              {expert.avatar ? (
                <img
                  src={expert.avatar}
                  alt={`Avatar for ${expert.name}`}
                  className="expert-avatar"
                  onClick={() => openChat(expert.mongoId)}
                />
              ) : (
                <div
                  className="expert-logo w-10 h-2"
                  onClick={() => openChat(expert.mongoId)}
                >
                  {/* Add your logo or profile picture source here */}
                  <img
                    src={avataricon}
                    alt={`Logo for ${expert.name}`}
                  />
                </div>
              )}
              <span>{expert.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  experts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
