import React, { useEffect, useState } from "react";
import Picture from "../Assets/Experts.jpg";
import { backendUrl } from "../data/data";
import Navbar from "./Navbar";

const ExpertAdviceDashboard = () => {
  const [advise, setAdvise] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const advise = await fetch(`${backendUrl}expert/instruction/all`, {
        method: "GET",
      });
      console.log(advise);
      const data = await advise.json();
      console.log(data);
      setAdvise(data.data);
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full py-16 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-white font-bold">EXPERT ADVICE HERE</p>
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-white">
              Get an Expert's advice
            </h1>
            <ul className="text-white font-bold">
              {advise &&
                advise.map((data) => <li key={data.id}>{data.content}</li>)}
            </ul>
          </div>
          <img className="w-[500px] mx-auto my-4" src={Picture} alt="/" />
        </div>
      </div>
    </>
  );
};

export default ExpertAdviceDashboard;
