import React, { useEffect, useRef } from "react";
import Carousel from "./Carousels";

const WhatOurStudentSays = () => {


  return (
    <div className="flex flex-col items-center h-full max-w-full gap-4 px-10 py-20 bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">What our Student Says</h1>
        <p className="max-w-3xl text-xl text-center text-gray-600 md:text-2xl">
          Discover how COC has transformed the journeys of students just like you. Real stories, real results—be inspired by their success!
        </p>
      </div>

      <Carousel />
    </div>
  );
};

export default WhatOurStudentSays;
