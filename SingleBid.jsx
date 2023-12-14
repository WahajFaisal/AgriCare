import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../data/data";
import { useEffect, useState } from "react";

const SingleBid = ({ bid }) => {
  const navigate = useNavigate();
  const { buyerId, myPrice, date, product, id } = bid;
  const addOrder = async () => {
    const data = await fetch(`${backendUrl}buyer/order/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product,
        buyerId: buyerId,
        price: myPrice,
        bidId: id,
      }),
    });
    // console.log(data)
    if (data.status == 201) {
      navigate("/loading/product");
    }
  };
  return (
    // <div className="single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
    //   <Link
    //     to={buyerId}
    //     state={bid}
    //     className="hover:text-rose-500 duration-300 flex justify-between items-center"
    //   >
    //     <h2 className="text-stone-950 font-semibold text-xl capitalize">
    //       {bid.buyerId}
    //     </h2>
    //   </Link>
    //   <p className="text-sm text-gray-600">
    //     Price: <span className="font-semibold capitalize">{myPrice}</span>
    //   </p>
    //   <button onClick={addOrder} className="bg-[#00df9a] float-right">
    //     Accept
    //   </button>
    // </div>
    <div>
      <tr className="border-b hover:bg-orange-100 bg-gray-100 position-relative  left-52">
        <td className="p-3 px-5">
          <input
            type="text"
            defaultValue={`# ${bid.buyerId}`}
            className="bg-transparent border-b-2 border-gray-300 py-2"
            readOnly
          />
        </td>
        <td className="p-3 px-5">
          <input
            type="text"
            defaultValue={`${myPrice} Rs`}
            className="bg-transparent border-b-2 border-gray-300 py-2"
            readOnly
          />
        </td>
        <td className="p-3 px-5 flex justify-end">
          <button
            type="button"
            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={addOrder}
          >
            Accept
          </button>
        </td>
      </tr>
    </div>
  );
};

export default SingleBid;
