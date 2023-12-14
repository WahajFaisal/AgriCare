import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./OTPVerification.css"; // Import the CSS file
import axios from "axios";
import { backendUrl } from "../data/data";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    try {
      const resp = await axios.post(
        `${backendUrl}authentication/auth/enterOtp`,
        {
          email: localStorage.getItem("email"),
          otp: enteredOtp,
        }
      );
      if (resp.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Correct OTP",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } else {
        // Incorrect OTP
        Swal.fire({
          icon: "error",
          title: "Incorrect OTP",
          text: "Please enter the correct OTP.",
        });
      }
    } catch (err) {
      let rsp = err.request.response;
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const filledInputs = otp.filter((value) => value !== "");

    if (filledInputs.length === otp.length) {
      // All fields are filled, trigger verification
      handleVerify();
    } else {
      // Focus on the next empty input field
      const nextEmptyIndex = otp.findIndex((value) => value === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex].current.focus();
      }
    }
  }, [otp]);

  return (
    <div className="otp-container bg-white">
      <form className="otp-form">
        <div className="otp-description">
          <p>Please enter the 6-digit OTP sent to your email</p>
        </div>
        <div className="otp-input-group">
          {otp.map((value, index) => (
            <input
              key={index}
              className="otp-input"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={inputRefs.current[index]}
              required
            />
          ))}
        </div>
        <div className="otp-action-group">
          <button
            className="otp-verify-button"
            type="button"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
