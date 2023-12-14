import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { backendUrl } from "../data/data";
import axios from "axios";
import SingleBid from "./SingleBid";
import AdminDashboard from "./AdminDashboard";

const MyBid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [bids, setBid] = useState([]);

  const para = useRef(null);

  const getData = async () => {
    try {
      let id = localStorage.getItem("id");
      const resp = await axios.get(`${backendUrl}buyer/bid/view/${id}`);
      // console.log(resp.data.data);
      setBid(resp.data.data);
      console.log(bids);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (err)
    // return (
    // //   <p className="h-screen flex flex-col justify-center items-center text-2xl">
    // //     <span>{err}</span>
    // //     <Link to="/mybid" className="text-lg text-gray-500 font-semibold">
    // //       &larr;Refresh page
    // //     </Link>
    // //   </p>
    // );

    return (
      <div className="container mx-auto pb-20">
        {localStorage.getItem("role") !== "admin" ? (
          <Navbar />
        ) : (
          <AdminDashboard />
        )}
        <h2 className="text-center text-3xl py-10">My Bids</h2>
        <div>
          <div>
            {bids &&
              bids.map((bid) => <SingleBid key={bid.id} product={bid} />)}
          </div>
        </div>
      </div>
    );
};

export default MyBid;
