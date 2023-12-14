import {
  FaGlobe,
  FaCertificate,
  FaPercentage,
  FaShieldAlt,
} from "react-icons/fa";

const Whyme = () => {
  return (
    <section className=" bg-black-50 pb-20">
      <div className="container mx-auto flex flex-col gap-5">
        <h2 className="text-4xl py-14 text-center font-semibold text-gray-700">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-4 gap-10 justify-between">
          <div className="text-center  flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaGlobe className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl text-gray-900 font-semibold" color="20FEA0">
              Countrywide Shipping
            </h1>
            <p className="text-gray-700 text-lg">
              We offer country shipping to make our products accessible to
              customers all over the country.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaCertificate className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold" color="20FEA0">Best Quality Products</h1>
            <p className="text-gray-700 text-lg">
              We believe in providing our customers with only the best quality
              products.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaPercentage className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold"  color="20FEA0">Best Bidding Offers</h1>
            <p className="text-gray-700 text-lg">
              We provide a platform that provide farmers best deals on there crops through bidding on there crops.
            </p>

            
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaShieldAlt className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold" color="20FEA0">Secure Payments</h1>
            <p className="text-gray-700 text-lg">
              We offer a range of secure payment options to ensure that your
              transactions are safe and secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyme;