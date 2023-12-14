import React from 'react'
import Navbar from './Navbar';
import OrderTrackingContainer from './OrderTrackingContainer';
// import Herotext from './Herotext';

const TrackOrder = () => {
  return (
  <>
    <Navbar/>
    <div>
    {/* <Herotext textt="Track your order" /> */}
      <OrderTrackingContainer />
    </div>
  </>
  )
}

export default TrackOrder