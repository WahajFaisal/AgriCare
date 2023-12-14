import {
    FaChartBar,
    FaUserTie,
    FaUsers,
    FaTruck
  } from "react-icons/fa";

  
  const WhyOurServices = () => {

    return (
      <section className=" bg-black-50 pb-20">
        <div className="container mx-auto flex flex-col gap-5">
          <div className="grid grid-cols-4 gap-10 justify-between">

          <a href="/cropsinspection">
            <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
              <div className="flex justify-center">
                {/* <FaChartBar className="text-7xl" color="#20FEA0"/> */}  {/*if we will want to change the color of the icons later*/}
                <FaChartBar className="text-7xl text-gray-700" />
              </div>
              <h1 className="text-2xl font-semibold" color="20FEA0">Crops Inspection</h1>
              <p className="text-gray-700 text-lg">
                We offer the finest crops inspection so that our customers get the best value possible
                out of their crops.
              </p>
            </div>
            </a>


            <a href="/expertadvice">
            <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
              <div className="flex justify-center">
                <FaUserTie className="text-7xl text-gray-700" />
              </div>
              <h1 className="text-2xl font-semibold" color="20FEA0">Expert Advice</h1>
              <p className="text-gray-700 text-lg">
                We believe in providing our customers the best of guidance and advice
                through our industry experts.
              </p>
            </div>
            </a>

            <a href="farmercommunity">
            <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
              <div className="flex justify-center">
                <FaUsers className="text-7xl text-gray-700" />
              </div>
              <h1 className="text-2xl font-semibold" color="20FEA0">Farmer Community</h1>
              <p className="text-gray-700 text-lg">
                We offer a trustworthy community where our  
                customers can chat and get notified with the hottest products.
              </p>
            </div>
            </a>

            <a href="trackorder">
            <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
              <div className="flex justify-center">
                <FaTruck className="text-7xl text-gray-700" />
              </div>
              <h1 className="text-2xl font-semibold" color="20FEA0">Track Order</h1>
              <p className="text-gray-700 text-lg">
                We offer a tracking feature to our customers
                to keep an eye on their valuable goods.
              </p>
            </div>
            </a>

            
          </div>
        </div>
      </section>
    );
  };

  export default WhyOurServices;