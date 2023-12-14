import React, { useEffect, useState } from "react";
import "./rate and review.css"; // Import the CSS file
import { FaStar } from "react-icons/fa";
import swal from "sweetalert";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../data/data";
import { data } from "autoprefixer";

const RatingReview = () => {
  const params = useParams();
  const navigate = useNavigate();
  let productId = params.id;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [seller, setSeller] = useState();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const fetchData = async () => {
    const resp = await fetch(`${backendUrl}admin/crop/getFarmer/${productId}`, {
      method: "GET",
    });
    const data = await resp.json();
    setSeller(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (review.trim() === "") {
      swal("Error", "Please provide a review.", "error");
      return;
    }
    const resp = await fetch(`${backendUrl}buyer/crop/rateAFarmer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerId: seller,
        rating: rating,
      }),
    });
    console.log(resp);
    if (resp.status == 201) {
      swal("Done", "Review submitted successfully!", "success");
      navigate("/product");
    } else {
      alert("Failed to Review");
    }
    console.log("Rating:", rating);
    console.log("Review:", review);
  };

  return (
    <>
      <Navbar />
      <div className="rating-review-container">
        <h1>Rate and Review</h1>
        <div className="rating">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleStarClick(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  size={30}
                />
              </label>
            );
          })}
        </div>
        <div className="review-input">
          <label htmlFor="review">Review:</label>
          <textarea id="review" value={review} onChange={handleReviewChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default RatingReview;
