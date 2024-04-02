"use client";
import React from "react";
import Map from "@/app/components/MapLoc";
import Navbar from "@/app/navbar/page";

const LocationPage = () => {
  return (
    <div>
      <Navbar />
      <div className="listMargin text-center mb-8">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
          Select a&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            State!
          </span>
        </h1>
      </div>
      <div className="mapmargin">
        <Map />
      </div>
    </div>
  );
};

export default LocationPage;
