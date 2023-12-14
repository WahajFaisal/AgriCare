import { useState, useEffect, useRef } from "react";
// import "../App.css";
import { MdFace } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import SingleProduct from "../components/SingleProduct";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl, chatBackendUrl } from "../data/data";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import Tooltip from "./Tooltip";
import "./tooltip.css";
import { toast } from "react-toastify";
import { GrChatOption } from "react-icons/gr";
const Products = () => {
  const navigate = useNavigate();
  const [opt, setOpt] = useState("");
  const [showCategories, setShowCategories] = useState("hidden");
  const [showExpert, setShowExpert] = useState("hidden");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [products, setProducts] = useState([]);
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [clas, setClas] = useState("");

  const [catPath, setCatPath] = useState("All");

  // console.log(catPath);

  const categories = ["All", "Grains", "Vegetables", "Fruit"];

  const para = useRef(null);

  async function priceBid() {
    const data = await fetch(`${backendUrl}/buyer/bid/bidPrice/${id}`, {
      method: "GET",
    });
    const json = await data.json();
    setBidPrice(json.data);
  }
  async function catChange(event) {
    // console.log(event.target.value);
    setCatPath(event.target.value);

    // console.log(catPath);
  }

  const getUser = async () => {
    const resp = await fetch(
      `${backendUrl}admin/user/user/${localStorage.getItem("id")}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    setUser(data.data);
  };

  const addBackg = () => {
    setClas("bg-green-700");
  };

  const getData = async () => {
    try {
      const resp = await axios.get(`${backendUrl}buyer/crop/all`);
      // console.log(resp.data.data);
      setProducts(resp.data.data);
      const respE = await axios.get(`${backendUrl}admin/user/allExperts`);
      setExperts(respE.data.data);
      // console.log(respE.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const addProduct = () => {
    // console.log(user)
    if (user.verify == true) navigate("/addProduct");
    else alert("Farmer not Verified");
  };

  useEffect(() => {
    getData();
    getUser();
    if (
      localStorage.getItem("role") == "farmer" &&
      localStorage.getItem("verify") == "false"
    ) {
      toast.error("Not Verify", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log(experts);
    // console.log(localStorage.getItem("id"));
  }, []);
  if (err)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        <span>{err}</span>
        <Link to="/product" className="text-lg text-gray-500 font-semibold">
          &larr;Refresh page
        </Link>
      </p>
    );

  return (
    <>
      {localStorage.getItem("role") !== "admin" ? (
        <div>
          <Navbar />
          <div className="flex">
            <aside
              id="default-sidebar"
              className="z-40 w-[200px] h-[1500px] mr-20"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <h3 className="flex-1 ms-3 whitespace-nowrap">
                        Choose Category
                      </h3>
                    </a>
                  </li>
                  {categories.map((category, index) => (
                    <li key={category} className="hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => setCatPath(categories[index])}
                      >
                        <span className={`flex-1 ms-3 whitespace-nowrap`}>
                          {categories[index]}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="w-[calc(100vh - 200px)]">
              <div className="flex space-x-[450px] ">
              {localStorage.getItem("role") == "farmer" &&
                  localStorage.getItem("verify") == "true" && (
                    

  <button onClick={addProduct} className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
    <div className="absolute inset-0 w-3 bg-green-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span className="relative text-black group-hover:text-white">Add Product</span>
  </button>
                  )}
                <form className="w-[400px] relative left-40">
                  <div>
                    <div className="flex">
                      <input
                        type="search"
                        id="default-search"
                        className="p-4 ps-10 text-sm text-gray-900 borderborder-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setSearch(e.target.value)}
                        required=""
                        placeholder="Search Here"
                      />
                    </div>
                  </div>
                </form>
                
              </div>
              <div className="flex justify-between">
                <div className="grid grid-cols-3">
                  {products &&
                    products.map(
                      (product) =>
                        (product.name.includes(search) ||
                          product.location.includes(search)) && (
                          <SingleProduct
                            key={product.id}
                            product={product}
                            cat={catPath}
                          />
                        )
                    )}
                </div>
                <div className="avatar-container sticky top-96 my-5">
                  <Tooltip
                  
                    experts={experts}
                    children={
                      <div className="">
                        <GrChatOption  size={50} className="" />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div>
            <AdminDashboard />
          </div>
          <div className="w-3/4 p-4">
            <div className="container mx-auto pb-20">
              <div>
                <div className="grid grid-cols-3 gap-10 absolute left-60">
                  {products &&
                    products.map(
                      (product) =>
                        product.name.includes(search) && (
                          <SingleProduct
                            key={product.id}
                            product={product}
                            cat={catPath}
                          />
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
