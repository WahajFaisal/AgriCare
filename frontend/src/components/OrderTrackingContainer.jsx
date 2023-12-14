import React, { useState } from 'react';

const OrderTrackingContainer = () => {
  // You can use this state to store and manage the order tracking information
  const [orderStatus, setOrderStatus] = useState({
    orderNumber: '',
    trackingNumber: '',
    status: '',
    location: '',
    estimatedDelivery: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission and fetch the order tracking information here
    // For demonstration purposes, we are using a static response.
    setOrderStatus({
      orderNumber: '123456789',
      trackingNumber: 'TRACK123',
      status: 'In Transit',
      location: 'Shipping Center',
      estimatedDelivery: '2023-07-30',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg relative">
    <div className="p-6">
    <h2 className="text-2xl font-bold text-center text-green-500 mb-8">Track your order</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block text-green-500 font-bold mb-2">
          Order Number
          <input
            type="text"
            id='ordernumber'
            className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your order number"
            required
            value={orderStatus.orderNumber}
            onChange={(e) => setOrderStatus({ ...orderStatus, orderNumber: e.target.value })}
          />
          
        </label >
        </div>

        <div className="mb-4">
        <label className="block text-green-500 font-bold mb-2">
          Tracking Number
          <input
            type="text"
            id='trackingnumber'
            className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your tracking number"
            required
            value={orderStatus.trackingNumber}
            onChange={(e) => setOrderStatus({ ...orderStatus, trackingNumber: e.target.value })}
          />
        </label>
        </div>

        <div className="mb-6">
        <button type="submit" className="bg-[#00df9a] w-full rounded-md font-bold py-2.5 text-black">Track</button>
        </div>

      </form>
      </div>
      
      {orderStatus.status && (
        <div>
          <h3>Order Status</h3>
          <p>Order Number: {orderStatus.orderNumber}</p>
          <p>Tracking Number: {orderStatus.trackingNumber}</p>
          <p>Status: {orderStatus.status}</p>
          <p>Location: {orderStatus.location}</p>
          <p>Estimated Delivery: {orderStatus.estimatedDelivery}</p>
        </div>
                            )}
        </div>
    </div>
  );
};

export default OrderTrackingContainer;