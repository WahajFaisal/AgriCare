import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Product from "./components/Product";
import Services from "./components/Services";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import Contact from "./components/Contact";
import About from "./components/About";
import Booking from "./components/Booking";
import CropsInspection from "./components/CropsInspection";
import ExpertAdvice from "./components/ExpertAdvice";
import FarmerCommunity from "./components/FarmerCommunity";
import TrackOrder from "./components/TrackOrder";
import ExpertAdviceDashboard from "./components/ExpertAdviceDashboard";
import ProductAdd from "./components/ProductAdd";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import ProductEdit from "./components/ProductEdit";
import Loading from "./components/Loading";
import Blog from "./components/Blog";
import BuyerBids from "./components/BuyerBids";
import MessageAdd from "./components/MessageAdd";
import Messages from "./components/Messages";
// import OrderTracking from "./components/ordertrack";
import RatingReview from "./components/rate and review";
import OrdersPage from "./components/myorders";
import AdminPanel from "./components/admin";
import Inspection from "./components/Inspection";
import ExpertPage from "./components/ExpertPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTP from "./components/OTP";
import OrderTracking from "./components/OrderTrack";
// import MyBid from "./components/MyBid";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/product" element={<Product />} />
          <Route path="/services" element={<Services />} />
          <Route path="/cropsinspection" element={<CropsInspection />} />
          <Route path="/expertadvice" element={<ExpertAdvice />} />
          <Route path="/farmercommunity" element={<FarmerCommunity />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/cont" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/addProduct" element={<ProductAdd />} />
          <Route path="/booking/:productId" element={<Booking />} />
          <Route path="/expertAdvice" element={<ExpertAdvice />} />
          <Route path="/allAdvices" element={<ExpertAdviceDashboard />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDash" element={<AdminDashboard />} />
          <Route path="/allUsers" element={<Users />} />
          <Route path="/user/:id" element={<SingleUser />} />
          <Route path="/loading/:link" element={<Loading />} />
          <Route path="/editProduct/:productId" element={<ProductEdit />} />
          <Route path="/allBlogs" element={<Blog />} />
          <Route path="/allBids/:id" element={<BuyerBids />} />
          <Route path="/message/:id" element={<MessageAdd />} />
          <Route path="/messages/:id" element={<Messages />} />
          {/* <Route path="/notification" element={<Notification />} /> */}
          {/* <Route path="/mybid" element={<MyBid />} /> */}
          <Route path="/track-order/:id" element={<OrderTracking />} />
          <Route path="/rate" element={<RatingReview />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/status/:id" element={<AdminPanel />} />
          <Route path="/rate/:id" element={<RatingReview />} />
          <Route path="/inspection" element={<Inspection />} />
          <Route path="/expertTalk/:id" element={<ExpertPage />} />
          <Route path="/track-order/:id" element={<OrderTracking />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
