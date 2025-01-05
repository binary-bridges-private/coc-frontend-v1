import React, { useEffect, useRef } from "react";
import Carousel from "./Carousels";

const WhatOurStudentSays = () => {


  return (
    <div className="flex flex-col items-center h-full max-w-full gap-4 px-10 py-20 bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-semibold text-gray-800 lg:text-hl md:text-hm text-hs">What our Student Says</h1>
        <p className="max-w-3xl text-center text-gray-600 lg:text-pl md:text-pm text-ps">
          Discover how COC has transformed the journeys of students just like you. Real stories, real results—be inspired by their success!
        </p>
      </div>

      <Carousel />
    </div>
  );
};

export default WhatOurStudentSays;
