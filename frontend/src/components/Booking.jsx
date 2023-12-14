import { useEffect, useState } from "react";
import Herotext from "../components/Herotext";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { backendUrl } from "../data/data";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Booking = () => {
  const product = useParams().productId;
  const [sub, setSub] = useState(0);
  const [tnx, setTnx] = useState("");
  const [formData, setFormData] = useState(""); //form data are saved here
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (sub <= 0) {
      alert("Must be Positive");
      setSub(0);
      return;
    }
    const data = await fetch(`${backendUrl}buyer/bid/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
        // Add other headers here if needed
      },
      body: JSON.stringify({
        product: product,
        myPrice: sub,
        tokenData: localStorage.getItem("token"),
        buyerId: localStorage.getItem("id"),
      }),
    });
    // console.log(data);
    if (data.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Bid Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/loading/product");
    } else {
      alert("Error");
    }
  }

  const allBids = async () => {
    const resp = await fetch(`${backendUrl}buyer/bid/bidProduct/${product}`, {
      method: "GET",
    });
    const data = await resp.json();
    // console.log(data.data);
    setBids(data.data);
  };

  useEffect(() => {
    allBids();
    // console.log(bids);
  }, []);

  return (
    <section className="">
      <Navbar />
      <Herotext textt="Bidding" />
      <div className="h-[10rem] flex items-center justify-center shadow-md">
        <form onSubmit={handleSubmit} className="flex gap-10 items-center">
          <div className="flex gap-10">
            <input
              required
              className="border px-5 py-1"
              type="number"
              placeholder="Price?"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-gray-50 border rounded-full border-sky-500 px-10 bg-sky-500 py-2"
          >
            Bid
          </button>
        </form>
      </div>
      <div className="container mx-auto pb-20">
        <h2 className="text-center text-3xl py-10">Other Bids</h2>
        <div>
          <div className="text-gray-900 bg-gray-200">
            <div className="px-3 py-4 flex justify-center">
              <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <tbody>
                  <tr className="border-b">
                    <th className="text-left p-3 px-5">Buyer</th>
                    <th className="text-left p-3 px-5">Bid</th>
                    <th />
                  </tr>
                  {bids &&
                    bids.map((bid) => (
                      <tr className="border-b hover:bg-orange-100 bg-gray-100">
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            defaultValue={bid.buyerId}
                            className="bg-transparent border-b-2 border-gray-300 py-2"
                            readOnly
                          />
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            defaultValue={bid.myPrice}
                            className="bg-transparent border-b-2 border-gray-300 py-2"
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
