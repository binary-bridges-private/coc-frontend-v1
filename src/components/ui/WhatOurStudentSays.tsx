import React, { useEffect, useRef } from "react";
import Carousel from "./Carousels";

const WhatOurStudentSays = () => {


  return (
    <div className="flex flex-col items-center gap-4 p-10 max-w-full h-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">What our Student Says</h1>
        <p className="text-xl md:text-2xl text-gray-600 text-center max-w-3xl">
          Discover how COC has transformed the journeys of students just like you. Real stories, real results—be inspired by their success!
        </p>
      </div>

      <Carousel />
    </div>
  );
};

export default WhatOurStudentSays;
