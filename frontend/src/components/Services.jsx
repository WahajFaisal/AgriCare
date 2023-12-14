import React from "react";
import Navbar from "./Navbar";
import Herotext from "./Herotext";
const Services = () => {
  return (
    <>
      <Navbar />
      <Herotext textt="Our Warehouses" />
      <div className="flex flex-row justify-between">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Lahore
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Lahore warehouse near askari 10, Zarrar Shaheed road. Comprising of 10000 capacity.
          </p>
          <a
            href="https://www.google.com/maps/place/Green+Town+Cemetery,+Quaid-e-Azam+Industrial+Estate+Quaid+e+Azam+Industrial+Estate,+Lahore,+Punjab,+Pakistan/@31.4350875,74.3000874,15z/data=!4m6!3m5!1s0x391906d1d067323b:0xfebc31d6e0254c30!8m2!3d31.4365647!4d74.3202542!16s%2Fg%2F11cknfxzhn?entry=ttu"
            target="blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Open Map
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pakpattan
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Pakpattan warehouse near Pakpattan interchange main road 74-D. Comprising of 5000 capacity.
          </p>
          <a
            href="https://www.google.com/maps/place/Green+Town+Cemetery,+Quaid-e-Azam+Industrial+Estate+Quaid+e+Azam+Industrial+Estate,+Lahore,+Punjab,+Pakistan/@31.4350875,74.3000874,15z/data=!4m6!3m5!1s0x391906d1d067323b:0xfebc31d6e0254c30!8m2!3d31.4365647!4d74.3202542!16s%2Fg%2F11cknfxzhn?entry=ttu"
            target="blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Open Map
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Multan
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Multan warehouse near cantt 654-A. Comprising of 7500 capacity.
          </p>
          <a
            href="https://www.google.com/maps/place/Green+Town+Cemetery,+Quaid-e-Azam+Industrial+Estate+Quaid+e+Azam+Industrial+Estate,+Lahore,+Punjab,+Pakistan/@31.4350875,74.3000874,15z/data=!4m6!3m5!1s0x391906d1d067323b:0xfebc31d6e0254c30!8m2!3d31.4365647!4d74.3202542!16s%2Fg%2F11cknfxzhn?entry=ttu"
            target="blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Open Map
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Services;
