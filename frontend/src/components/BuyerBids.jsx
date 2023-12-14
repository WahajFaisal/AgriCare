import React, { useEffect, useState } from "react";
import { backendUrl } from "../data/data";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import SingleBid from "./SingleBid";

const BuyerBids = () => {
  const data = useParams();
  const pid = parseInt(data.id);
  const [bids, setBids] = useState([]);
  const fetchData = async () => {
    const resp = await fetch(`${backendUrl}buyer/bid/bidProduct/${pid}`, {
      method: "GET",
    });
    const data = await resp.json();
    // console.log(data)
    setBids(data.data);
    // console.log(data.data)
  };
  useEffect(() => {
    fetchData();
    // console.log(bids)
  }, []);
  return (
    <div>
      <div>
        <Navbar />
        <div className="container mx-auto pb-20">
          <h2 className="text-center text-3xl py-10">All Bids</h2>
          <div>
            <div>
              {bids.length > 0 ? (
                bids.map((bid) => <SingleBid key={bid.id} bid={bid} />)
              ) : (
                <h1 className="text-center">No Bids</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerBids;
